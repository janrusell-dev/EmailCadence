import { getEnrollment, startEnrollment, updateCadence } from "@/lib/api";
import { useEffect, useState } from "react";
import { CadenceStep, Enrollment } from "shared";
import { toast } from "sonner";

export function useEnrollment() {
  const [cadenceId, setCadenceId] = useState("");
  const [email, setEmail] = useState("");
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [steps, setSteps] = useState<CadenceStep[]>([]);

  async function handleStart() {
    try {
      const res = await startEnrollment({
        cadenceId,
        contactEmail: email,
      });

      if (!res) {
        throw new Error("Empty response");
      }

      setEnrollment(res);
      setSteps(res.steps || []);

      toast.success("Enrollment + Steps loaded successfully!");
    } catch (e) {
      if (e instanceof Error) {
        toast.error(`Workflow error: ${e.message}`);
      } else {
        toast.error("Workflow error: Something went wrong");
      }
    }
  }

  useEffect(() => {
    if (!enrollment?.id) return;

    const interval = setInterval(async () => {
      const state = await getEnrollment(enrollment.id);
      setEnrollment(state);
    }, 3000);

    return () => clearInterval(interval);
  }, [enrollment?.id]);

  async function handleUpdate() {
    if (!enrollment) return;

    try {
      const res = await updateCadence(enrollment.id, steps);

      setEnrollment(res);

      toast.success("Cadence updated successfully!");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error occurred";

      toast.error(`Update failed: ${message}`);
    }
  }

  return {
    cadenceId,
    setCadenceId,
    email,
    setEmail,
    enrollment,
    steps,
    setSteps,
    handleStart,
    handleUpdate,
  };
}

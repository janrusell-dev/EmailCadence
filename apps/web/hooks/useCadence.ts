import { createCadence } from "@/lib/api";
import { useState } from "react";
import { Cadence } from "shared";
import { StepType } from "shared/enums/workflow.enums";
import { toast } from "sonner";

export function useCadence() {
  const [payload, setPayload] = useState<Cadence>({
    id: "cad_123",
    name: "Test Cadence",
    steps: [
      {
        id: "1",
        type: StepType.SEND_EMAIL,
        subject: "Hello",
        body: "Welcome!",
      },
      {
        id: "2",
        type: StepType.WAIT,
        seconds: 10,
      },
      {
        id: "3",
        type: StepType.WAIT,
        subject: "Follow up",
        body: "Checking in",
      },
    ],
  });

  async function handleSave() {
    try {
      const res = await createCadence(payload);
      toast(`cadence created: ${payload.id}`);
    } catch (err) {
      console.error(err);
      toast.error(`cadence error ${payload.id}`);
    }
  }

  return {
    payload,
    setPayload,
    handleSave,
  };
}

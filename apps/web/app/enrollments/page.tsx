"use client";

import { useState, useEffect } from "react";
import { startEnrollment, getEnrollment, updateCadence } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import JsonEditor from "@/components/json-editor";
import Link from "next/link";
import { useEnrollment } from "@/hooks/useEnrollment";
export default function EnrollmentsPage() {
  const {
    cadenceId,
    setCadenceId,
    email,
    setEmail,
    enrollment,
    handleStart,
    handleUpdate,
    steps,
    setSteps,
  } = useEnrollment();

  return (
    <div className="p-6 space-y-6">
      <Link href="/" className="">
        <Button variant={"link"}>Home</Button>
      </Link>
      <Link href="/cadence" className="">
        <Button variant={"link"}>Cadence</Button>
      </Link>
      <h1 className="text-xl font-bold">Enrollments</h1>
      <div className="space-y-4">
        <Input
          placeholder="Cadence ID"
          value={cadenceId}
          onChange={(e) => setCadenceId(e.target.value)}
        />

        <Input
          placeholder="Contact Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={handleStart}>Start Workflow</Button>
      </div>
      {enrollment && (
        <div className="border p-4 rounded-xl space-y-2">
          <p>Status: {enrollment.status}</p>
          <p>Current Step: {enrollment.currentStepIndex}</p>
          <p>Version: {enrollment.stepsVersion}</p>
        </div>
      )}

      {enrollment && (
        <>
          <h2 className="font-semibold">Update Running Cadence</h2>

          <JsonEditor value={steps} onChange={setSteps} />

          <Button onClick={handleUpdate}>Update Cadence</Button>
        </>
      )}
    </div>
  );
}

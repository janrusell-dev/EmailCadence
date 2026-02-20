"use client";

import JsonEditor from "@/components/json-editor";
import { Button } from "@/components/ui/button";
import { useCadence } from "@/hooks/useCadence";
import Link from "next/link";

export default function CadencePage() {
  const { payload, setPayload, handleSave } = useCadence();

  return (
    <div className="p-6 space-y-4">
      <Link href="/">
        <Button variant={"link"}>Home</Button>
      </Link>
      <Link href="/enrollments">
        <Button variant={"link"}>Enrollments</Button>
      </Link>
      <h1 className="text-xl font-bold">Cadence Editor</h1>

      <JsonEditor value={payload} onChange={setPayload} />
      <Button onClick={handleSave} className="flex items-center  space-x-2">
        Create Cadence
      </Button>
    </div>
  );
}

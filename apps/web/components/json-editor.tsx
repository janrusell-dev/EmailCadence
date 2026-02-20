"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface JsonEditorProps<T> {
  value: T;
  onChange: (v: T) => void;
}

export default function JsonEditor<T>({ value, onChange }: JsonEditorProps<T>) {
  const [text, setText] = useState(JSON.stringify(value, null, 2));

  useEffect(() => {
    setText(JSON.stringify(value, null, 2));
  }, [value]);

  function handleChange(v: string) {
    setText(v);
    try {
      onChange(JSON.parse(v) as T);
    } catch {}
  }

  return (
    <Textarea
      className="min-h-75 font-mono"
      value={text}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}

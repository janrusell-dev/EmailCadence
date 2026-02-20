import { Cadence, CadenceStep } from "shared";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export async function createCadence(payload: Cadence) {
  return fetch(`${API_BASE}/cadences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
}

export async function startEnrollment(payload: {
  cadenceId: string;
  contactEmail: string;
}) {
  return fetch(`${API_BASE}/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
}

export async function getEnrollment(id: string) {
  return fetch(`${API_BASE}/enrollments/${id}`).then((r) => r.json());
}

export async function updateCadence(id: string, steps: CadenceStep[]) {
  return fetch(`${API_BASE}/enrollments/${id}/update-cadence`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ steps }),
  }).then((r) => r.json());
}

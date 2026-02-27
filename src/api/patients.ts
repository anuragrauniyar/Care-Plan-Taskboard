// src/api/patients.ts

import { apiFetch } from "./client";
import type { Patient } from "../types/domain";

export function fetchPatients(): Promise<Patient[]> {
  return apiFetch<Patient[]>("/patients");
}
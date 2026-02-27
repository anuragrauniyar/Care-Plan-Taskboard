// src/types/domain.ts

export type Role = "nurse" | "dietician" | "social_worker";

export type TaskStatus = "todo" | "in_progress" | "completed";

export interface Patient {
  id: string;
  name: string;
  dob: string; // ISO string
  dialysisStartDate: string; // ISO string
}

export interface Task {
  id: string;
  patientId: string;
  title: string;
  description?: string; // optional on purpose (backend may omit)
  status: TaskStatus;
  dueDate: string; // ISO date string
  role: Role; // who is responsible
  createdAt: string;
  updatedAt: string;
}
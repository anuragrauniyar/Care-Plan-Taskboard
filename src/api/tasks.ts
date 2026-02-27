// src/api/tasks.ts

import { apiFetch } from "./client";
import type { Task } from "../types/domain";

export function fetchTasks(patientId: string): Promise<Task[]> {
  return apiFetch<Task[]>(`/patients/${patientId}/tasks`);
}

export function createTask(
  patientId: string,
  data: Partial<Task>
): Promise<Task> {
  return apiFetch<Task>(`/patients/${patientId}/tasks`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTask(
  taskId: string,
  data: Partial<Task>
): Promise<Task> {
  return apiFetch<Task>(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
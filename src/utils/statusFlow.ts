// src/utils/statusFlow.ts

import type { TaskStatus } from "../types/domain";

export function getNextStatus(status: TaskStatus): TaskStatus {
  if (status === "todo") return "in_progress";
  if (status === "in_progress") return "completed";
  return "completed";
}
// src/utils/filterTasks.ts

import type { Task, Role } from "../types/domain";

export type TimeFilter = "overdue" | "today" | "upcoming" | "all";

export function filterTasks(
  tasks: Task[],
  roleFilter: Role | "all",
  timeFilter: TimeFilter
) {
  const now = new Date();

  return tasks.filter((task) => {
    // Role filtering
    if (roleFilter !== "all" && task.role !== roleFilter) {
      return false;
    }

    const due = new Date(task.dueDate);

    // Time filtering
    if (timeFilter === "overdue" && due >= now) {
      return false;
    }

    if (
      timeFilter === "today" &&
      due.toDateString() !== now.toDateString()
    ) {
      return false;
    }

    if (timeFilter === "upcoming" && due <= now) {
      return false;
    }

    return true;
  });
}
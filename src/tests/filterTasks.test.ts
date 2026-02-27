import { describe, it, expect } from "vitest";
import { filterTasks } from "../utils/filterTasks";
import type { Task } from "../types/domain";

const mockTasks: Task[] = [
  {
    id: "1",
    patientId: "p1",
    title: "Test Task",
    status: "todo",
    role: "nurse",
    dueDate: new Date(Date.now() - 100000).toISOString(),
    createdAt: "",
    updatedAt: "",
  },
];

describe("filterTasks", () => {
  it("filters overdue tasks correctly", () => {
    const result = filterTasks(
      mockTasks,
      "nurse",
      "overdue"
    );

    expect(result.length).toBe(1);
  });

  it("filters by role correctly", () => {
    const result = filterTasks(
      mockTasks,
      "dietician",
      "all"
    );

    expect(result.length).toBe(0);
  });
});
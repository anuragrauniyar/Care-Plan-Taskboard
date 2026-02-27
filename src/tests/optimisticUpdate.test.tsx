import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TaskCard from "../components/TaskBoard/TaskCard";
import type { Task } from "../types/domain";
import * as api from "../api/tasks";

describe("Optimistic update rollback", () => {
  it("rolls back when server fails", async () => {
    const task: Task = {
      id: "t1",
      patientId: "p1",
      title: "Test",
      status: "todo",
      role: "nurse",
      dueDate: new Date().toISOString(),
      createdAt: "",
      updatedAt: "",
    };

    const queryClient = new QueryClient();
    queryClient.setQueryData(["tasks", "p1"], [task]);

    vi.spyOn(api, "updateTask").mockRejectedValue(
      new Error("Server error")
    );

    render(
      <QueryClientProvider client={queryClient}>
        <TaskCard task={task} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText("Test"));

    await waitFor(() => {
      const cached =
        queryClient.getQueryData<Task[]>([
          "tasks",
          "p1",
        ]);
      expect(cached?.[0].status).toBe("todo");
    });
  });
});
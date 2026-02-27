// src/hooks/useCreateTask.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../api/tasks";
import type { Task } from "../types/domain";

export function useCreateTask(patientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Task>) =>
      createTask(patientId, data),

    onMutate: async (newTaskData) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", patientId],
      });

      const previousTasks =
        queryClient.getQueryData<Task[]>([
          "tasks",
          patientId,
        ]);

      const optimisticTask: Task = {
        id: crypto.randomUUID(),
        patientId,
        title: newTaskData.title || "Untitled",
        description: newTaskData.description,
        status: newTaskData.status || "todo",
        role: newTaskData.role || "nurse",
        dueDate:
          newTaskData.dueDate ||
          new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Task[]>(
        ["tasks", patientId],
        (old) => [...(old || []), optimisticTask]
      );

      return { previousTasks };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", patientId],
          context.previousTasks
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", patientId],
      });
    },
  });
}
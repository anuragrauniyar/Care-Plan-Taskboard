// src/hooks/useUpdateTask.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import type { Task } from "../types/domain";

export function useUpdateTask(patientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: Partial<Task>;
    }) => updateTask(taskId, data),

    onMutate: async ({ taskId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks", patientId],
      });

      const previousTasks =
        queryClient.getQueryData<Task[]>([
          "tasks",
          patientId,
        ]);

      queryClient.setQueryData<Task[]>(
        ["tasks", patientId],
        (old) =>
          old?.map((task) =>
            task.id === taskId
              ? { ...task, ...data }
              : task
          ) || []
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
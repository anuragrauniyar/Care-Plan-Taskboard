import type { Task } from "../../types/domain";
import { getNextStatus } from "../../utils/statusFlow";
import { useUpdateTask } from "../../hooks/useUpdateTask";

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const mutation = useUpdateTask(task.patientId);

  const handleClick = () => {
    const nextStatus = getNextStatus(task.status);

    mutation.mutate({
      taskId: task.id,
      data: { status: nextStatus },
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: "#f9fafb",
        padding: 10,
        borderRadius: 6,
        marginBottom: 8,
        cursor: "pointer",
        border: "1px solid #e5e7eb",
        transition: "0.2s ease",
        opacity: mutation.isPending ? 0.6 : 1,
      }}
    >
      <div style={{ fontWeight: 500 }}>
        {task.title}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginTop: 4,
        }}
      >
        {task.role} • {task.status}
      </div>
    </div>
  );
}

export default TaskCard;
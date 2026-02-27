import type { Task, TaskStatus, Role } from "../../types/domain";
import type { TimeFilter } from "../../utils/filterTasks";
import { filterTasks } from "../../utils/filterTasks";
import TaskCard from "./TaskCard";

interface Props {
  tasks?: Task[];
  status: TaskStatus;
  loading: boolean;
  roleFilter: Role | "all";
  timeFilter: TimeFilter;
}

function TaskColumn({
  tasks,
  status,
  loading,
  roleFilter,
  timeFilter,
}: Props) {
  if (loading) return <div>Loading...</div>;

  if (!tasks || tasks.length === 0) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: 8,
          minHeight: 80,
        }}
      />
    );
  }

  // First filter by role + time safely
  const fullyFiltered = filterTasks(tasks, roleFilter, timeFilter);

  // Then filter by status
  const filteredByStatus = fullyFiltered.filter(
    (t) => t.status === status
  );

  return (
    <div 
      style={{
    background: "white",
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  }}
    >
      {filteredByStatus.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskColumn;
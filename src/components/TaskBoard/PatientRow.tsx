import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/tasks";
import { useCreateTask } from "../../hooks/useCreateTask";
import type { Patient, Role } from "../../types/domain";
import type { TimeFilter } from "../../utils/filterTasks";
import TaskColumn from "./TaskColumn";

interface Props {
  patient: Patient;
  roleFilter: Role | "all";
  timeFilter: TimeFilter;
}

function PatientRow({ patient, roleFilter, timeFilter }: Props) {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks", patient.id],
    queryFn: () => fetchTasks(patient.id),
  });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");

  const createMutation = useCreateTask(patient.id);

  const handleCreate = () => {
    if (!title.trim()) return;

    createMutation.mutate({
      title,
      status: "todo",
      role: "nurse",
      dueDate: new Date().toISOString(),
    });

    setTitle("");
    setShowForm(false);
  };

  return (
    <div
      style={{
         display: "grid",
    gridTemplateColumns: "220px 1fr 1fr 1fr",
    gap: 20,
    marginBottom: 30,
    alignItems: "start",
      }}
    >
      {/* Patient Info + Create Form */}
      <div>
  <div style={{ fontWeight: 600, marginBottom: 6 }}>
    {patient.name}
  </div>

  <button
    onClick={() => setShowForm(!showForm)}
    style={{
      fontSize: 12,
      padding: "4px 8px",
    }}
  >
    + Add Task
  </button>

  {showForm && (
    <div style={{ marginTop: 8 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        style={{ width: "100%" }}
      />
      <button
        onClick={handleCreate}
        style={{
          marginTop: 6,
          width: "100%",
        }}
      >
        Save
      </button>
    </div>
  )}
</div>

      {/* Columns */}
      <TaskColumn
        tasks={tasks}
        status="todo"
        loading={isLoading}
        roleFilter={roleFilter}
        timeFilter={timeFilter}
      />

      <TaskColumn
        tasks={tasks}
        status="in_progress"
        loading={isLoading}
        roleFilter={roleFilter}
        timeFilter={timeFilter}
      />

      <TaskColumn
        tasks={tasks}
        status="completed"
        loading={isLoading}
        roleFilter={roleFilter}
        timeFilter={timeFilter}
      />
    </div>
  );
}

export default PatientRow;
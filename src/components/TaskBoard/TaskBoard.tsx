import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPatients } from "../../api/patients";
import PatientRow from "./PatientRow";
import type { Role } from "../../types/domain";
import type { TimeFilter } from "../../utils/filterTasks";

function TaskBoard() {
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  if (isLoading) return <div>Loading patients...</div>;
  if (error) return <div>Failed to load patients</div>;

  return (
  <div style={{ padding: 30 }}>
    <h1 style={{ fontSize: 28, fontWeight: 600 }}>
      Care Plan Taskboard
    </h1>

    {/* Filters */}
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 30,
      }}
    >
      <select
        value={roleFilter}
        onChange={(e) =>
          setRoleFilter(e.target.value as Role | "all")
        }
      >
        <option value="all">All Roles</option>
        <option value="nurse">Nurse</option>
        <option value="dietician">Dietician</option>
        <option value="social_worker">Social Worker</option>
      </select>

      <select
        value={timeFilter}
        onChange={(e) =>
          setTimeFilter(e.target.value as TimeFilter)
        }
      >
        <option value="all">All Time</option>
        <option value="overdue">Overdue</option>
        <option value="today">Due Today</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>

    {/* Header Row */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr 1fr 1fr",
        gap: 20,
        marginBottom: 12,
        fontWeight: 600,
        color: "#6b7280",
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 0.5,
      }}
    >
      <div>Patient</div>
      <div>Todo</div>
      <div>In Progress</div>
      <div>Completed</div>
    </div>

    {patients?.map((patient) => (
      <PatientRow
        key={patient.id}
        patient={patient}
        roleFilter={roleFilter}
        timeFilter={timeFilter}
      />
    ))}
  </div>
);
}

export default TaskBoard;
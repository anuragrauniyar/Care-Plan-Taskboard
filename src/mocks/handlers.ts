import { http, HttpResponse } from "msw";
import type { Patient, Task } from "../types/domain";

const patients: Patient[] = [
  {
    id: "1",
    name: "John Doe",
    dob: "1980-05-10",
    dialysisStartDate: "2022-01-15",
  },
  {
    id: "2",
    name: "Mary Smith",
    dob: "1975-11-22",
    dialysisStartDate: "2021-07-03",
  },
  {
    id: "3",
    name: "Robert Williams",
    dob: "1968-03-18",
    dialysisStartDate: "2020-11-12",
  },
];

let tasks: Task[] = [
  {
    id: "t1",
    patientId: "1",
    title: "Monthly Labs",
    status: "todo",
    role: "nurse",
    dueDate: "2026-02-20", // overdue
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "t2",
    patientId: "1",
    title: "Access Check",
    status: "in_progress",
    role: "nurse",
    dueDate: new Date().toISOString(), // today
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "t3",
    patientId: "1",
    title: "Diet Counselling",
    status: "completed",
    role: "dietician",
    dueDate: "2026-03-10",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "t4",
    patientId: "2",
    title: "Vaccination Reminder",
    status: "todo",
    role: "social_worker",
    dueDate: "2026-03-05",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const handlers = [
  http.get("/api/patients", async () => {
    await delay();
    return HttpResponse.json(patients);
  }),

  http.get("/api/patients/:id/tasks", async ({ params }) => {
    await delay();
    const { id } = params;
    return HttpResponse.json(
      tasks.filter((t) => t.patientId === id)
    );
  }),

  http.post("/api/patients/:id/tasks", async ({ request, params }) => {
    await delay();
    const body = await request.json();
    const newTask: Task = {
      id: crypto.randomUUID(),
      patientId: params.id as string,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...body,
    };

    tasks.push(newTask);
    return HttpResponse.json(newTask);
  }),

  http.patch("/api/tasks/:id", async ({ request, params }) => {
    await delay();

    const body = await request.json();
    const { id } = params;

    tasks = tasks.map((t) =>
      t.id === id
        ? { ...t, ...body, updatedAt: new Date().toISOString() }
        : t
    );

    const updated = tasks.find((t) => t.id === id);
    return HttpResponse.json(updated);
  }),
];

function delay(ms = 600) {
  return new Promise((res) => setTimeout(res, ms));
}
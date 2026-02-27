# Care Plan Taskboard — Dialysis Center

Frontend taskboard system for managing dialysis patient care tasks across multiple healthcare roles.

---

# 1. Setup Instructions

### Clone

```bash
git clone <your-repo-url>
cd care-plan-taskboard
```

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

App runs locally via Vite.

### Run Tests

```bash
npm run test
```

Total setup time: < 5 minutes.

---

# 2. Architecture Overview

## High-Level Structure

```
src/
  api/          → API abstraction layer
  components/   → UI components (TaskBoard, TaskColumn, TaskCard)
  hooks/        → React Query mutation hooks
  mocks/        → MSW backend simulation
  types/        → Domain contracts
  utils/        → Filtering & status helpers
  tests/        → Unit & integration-style tests
```

## Architecture Principles

### Separation of Concerns

- API logic isolated in `/api`
- Server state managed by React Query
- UI components purely declarative
- Domain types centralized in `/types`
- Filtering and business logic extracted to `/utils`

### Data Flow

UI → Mutation Hook → API Layer → MSW Backend  
Query Cache → UI Re-render  

Optimistic updates handled in mutation hooks.

---

# 3. Assumptions & Trade-offs

## Assumptions

- Backend exists and follows REST contract
- Tasks belong to one patient
- Roles are fixed and enumerable
- Dates provided as ISO strings
- Patient creation not required (outside scope)

## Trade-offs

- Did not implement patient CRUD (assignment did not require it)
- No drag-and-drop movement (status update click-based)
- Styling kept lightweight (no external UI framework)
- Filtering performed client-side for simplicity
- Mock backend used instead of real API for deterministic demo

Focus was placed on architecture and resilience over visual polish.

---

# 4. Core Features Implemented

## Taskboard Layout

Rows = Patients  
Columns = Task Status

```
Todo → In Progress → Completed
```

## Filtering

- By Role (nurse, dietician, social worker)
- By Time (overdue, today, upcoming)

## Optimistic Updates

Status transitions:

```
todo → in_progress → completed
```

- Immediate UI update
- Snapshot rollback on error
- Query invalidation after settle

## Task Creation

- Optimistic insertion into cache
- Rollback on failure
- Refetch for server reconciliation

---

# 5. Failure Modes & Edge Cases

## Network Failure

Handled via:

- `onMutate` optimistic update
- Cache snapshot restoration in `onError`
- Query invalidation in `onSettled`
- React Query retry strategy

## Partial Backend Data

- Optional fields supported
- Defensive null checks
- No assumptions on missing properties

## Empty States

- Columns display “No tasks”
- Loading states handled per patient row

---

# 6. Small Dataset / Seed Strategy

Mock backend implemented using MSW.

Seed data includes:

- Multiple patients
- Tasks across roles
- Overdue, today, and upcoming due dates
- Different task statuses

This allows realistic demonstration of filtering and failure handling.

---

# 7. Tests

Implemented:

1. `filterTasks` utility test  
   - Verifies correct filtering behavior  

2. Optimistic update rollback test  
   - Simulates server error  
   - Confirms cache restoration  

Tests focus on core business logic and mutation behavior.

---

# 8. Known Limitations

- No patient creation flow
- No authentication
- No pagination
- No drag-and-drop
- Styling intentionally minimal

---

# 9. What I Would Do Next

If given more time:

- Add drag-and-drop Kanban interaction
- Implement patient CRUD
- Add server-side filtering
- Add schema validation with Zod at API boundary
- Add accessibility improvements
- Add loading skeletons and toast notifications
- Deploy live demo (Vercel)

---

# 10. Demo

Options provided:

- Local dev server
- Screenshots included (if required)
- Screen recording (if requested)

---

# 11. Time Spent

Approx. 8–9 hours.

Time allocation:

- Architecture & setup
- API abstraction
- Optimistic updates
- Filtering logic
- Testing
- Documentation
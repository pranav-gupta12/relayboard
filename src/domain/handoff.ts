export type HandoffStatus = "needs-review" | "blocked" | "ready" | "acknowledged";

export type HandoffPriority = "critical" | "high" | "normal";

export type Shift = "morning" | "swing" | "overnight";

export interface Person {
  id: string;
  name: string;
  initials: string;
  role: string;
  color: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  complete: boolean;
}

export interface TimelineEvent {
  id: string;
  actor: string;
  detail: string;
  occurredAt: string;
}

export interface Handoff {
  id: string;
  title: string;
  summary: string;
  ownerId: string;
  recipientId: string;
  status: HandoffStatus;
  priority: HandoffPriority;
  shift: Shift;
  dueAt: string;
  updatedAt: string;
  labels: string[];
  checklist: ChecklistItem[];
  timeline: TimelineEvent[];
}

export interface HandoffFilters {
  query: string;
  status: HandoffStatus | "all";
  priority: HandoffPriority | "all";
  shift: Shift | "all";
}

export const DEFAULT_FILTERS: HandoffFilters = {
  query: "",
  status: "all",
  priority: "all",
  shift: "all",
};

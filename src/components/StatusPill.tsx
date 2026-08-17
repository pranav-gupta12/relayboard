import type { HandoffPriority, HandoffStatus } from "../domain/handoff";
import { formatLabel } from "../utils/format";

interface StatusPillProps {
  value: HandoffStatus | HandoffPriority;
  tone?: "status" | "priority";
}

export function StatusPill({ value, tone = "status" }: StatusPillProps) {
  return <span className={`pill pill--${tone} pill--${value}`}>{formatLabel(value)}</span>;
}

import type { Handoff } from "../domain/handoff";

export interface BoardMetrics {
  open: number;
  critical: number;
  blocked: number;
  acknowledged: number;
  completion: number;
}

export function getBoardMetrics(handoffs: Handoff[]): BoardMetrics {
  const acknowledged = handoffs.filter((item) => item.status === "acknowledged").length;
  return {
    open: handoffs.length - acknowledged,
    critical: handoffs.filter((item) => item.priority === "critical").length,
    blocked: handoffs.filter((item) => item.status === "blocked").length,
    acknowledged,
    completion: handoffs.length === 0 ? 0 : Math.round((acknowledged / handoffs.length) * 100),
  };
}

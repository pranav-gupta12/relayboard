import type { Handoff, HandoffFilters } from "../domain/handoff";

export function filterHandoffs(handoffs: Handoff[], filters: HandoffFilters): Handoff[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return handoffs.filter((handoff) => {
    const matchesQuery =
      query.length === 0 ||
      [handoff.title, handoff.summary, ...handoff.labels]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query);

    return (
      matchesQuery &&
      (filters.status === "all" || handoff.status === filters.status) &&
      (filters.priority === "all" || handoff.priority === filters.priority) &&
      (filters.shift === "all" || handoff.shift === filters.shift)
    );
  });
}

export function hasActiveFilters(filters: HandoffFilters): boolean {
  return (
    filters.query.trim().length > 0 ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.shift !== "all"
  );
}

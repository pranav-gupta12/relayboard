import type { Handoff, Person } from "../domain/handoff";
import { HandoffCard } from "./HandoffCard";

interface HandoffListProps {
  handoffs: Handoff[];
  peopleById: Record<string, Person>;
  selectedIds: Set<string>;
  activeId: string | null;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[], allSelected: boolean) => void;
  onOpen: (id: string) => void;
}

export function HandoffList({
  handoffs,
  peopleById,
  selectedIds,
  activeId,
  onToggle,
  onToggleAll,
  onOpen,
}: HandoffListProps) {
  const visibleIds = handoffs.map((handoff) => handoff.id);
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someSelected = visibleIds.some((id) => selectedIds.has(id));

  return (
    <section className="handoff-list" aria-labelledby="handoff-list-title">
      <header className="list-header">
        <label className="select-all">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(element) => { if (element) element.indeterminate = someSelected && !allSelected; }}
            onChange={() => onToggleAll(visibleIds, allSelected)}
          />
          <span>Select visible</span>
        </label>
        <h2 id="handoff-list-title">Current relay</h2>
        <span>Due soonest</span>
      </header>
      <div className="handoff-list__items">
        {handoffs.map((handoff) => (
          <HandoffCard
            key={handoff.id}
            handoff={handoff}
            owner={peopleById[handoff.ownerId]}
            recipient={peopleById[handoff.recipientId]}
            selected={selectedIds.has(handoff.id)}
            active={activeId === handoff.id}
            onSelect={() => onToggle(handoff.id)}
            onOpen={() => onOpen(handoff.id)}
          />
        ))}
      </div>
    </section>
  );
}

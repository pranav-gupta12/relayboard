import { useMemo, useReducer, useRef, useState } from "react";
import { BoardHeader } from "./components/BoardHeader";
import { BulkActionBar } from "./components/BulkActionBar";
import { DetailPanel } from "./components/DetailPanel";
import { EmptyState } from "./components/EmptyState";
import { FilterBar } from "./components/FilterBar";
import { HandoffList } from "./components/HandoffList";
import { MetricStrip } from "./components/MetricStrip";
import { INITIAL_HANDOFFS } from "./data/handoffs";
import { PEOPLE_BY_ID } from "./data/people";
import { DEFAULT_FILTERS, type HandoffFilters } from "./domain/handoff";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { selectionReducer } from "./state/selection";
import { filterHandoffs, hasActiveFilters } from "./utils/filterHandoffs";
import { getBoardMetrics } from "./utils/metrics";

const STORAGE_KEY = "relayboard-handoffs-v1";

export default function App() {
  const [handoffs, setHandoffs] = useLocalStorage(STORAGE_KEY, INITIAL_HANDOFFS);
  const [filters, setFilters] = useState<HandoffFilters>(DEFAULT_FILTERS);
  const [selectedIds, dispatchSelection] = useReducer(selectionReducer, new Set<string>());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const visibleHandoffs = useMemo(
    () => filterHandoffs(handoffs, filters),
    [filters, handoffs],
  );
  const metrics = useMemo(() => getBoardMetrics(handoffs), [handoffs]);
  const activeHandoff = handoffs.find((handoff) => handoff.id === activeId) ?? null;

  useKeyboardShortcut("/", () => searchInputRef.current?.focus());
  useKeyboardShortcut("Escape", () => {
    if (activeId) setActiveId(null);
  });

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const toggleVisible = (ids: string[], allSelected: boolean) => {
    dispatchSelection({ type: allSelected ? "remove-many" : "select-many", ids });
  };

  const acknowledgeSelected = () => {
    const count = selectedIds.size;
    setHandoffs((current) =>
      current.map((handoff) =>
        selectedIds.has(handoff.id)
          ? { ...handoff, status: "acknowledged" as const, updatedAt: new Date().toISOString() }
          : handoff,
      ),
    );
    dispatchSelection({ type: "clear" });
    setAnnouncement(`${count} ${count === 1 ? "handoff" : "handoffs"} acknowledged.`);
  };

  const toggleChecklist = (itemId: string) => {
    if (!activeHandoff) return;
    setHandoffs((current) =>
      current.map((handoff) =>
        handoff.id === activeHandoff.id
          ? {
              ...handoff,
              checklist: handoff.checklist.map((item) =>
                item.id === itemId ? { ...item, complete: !item.complete } : item,
              ),
              updatedAt: new Date().toISOString(),
            }
          : handoff,
      ),
    );
  };

  const resetDemo = () => {
    setHandoffs(INITIAL_HANDOFFS);
    setFilters(DEFAULT_FILTERS);
    dispatchSelection({ type: "clear" });
    setActiveId(null);
    setAnnouncement("Relayboard demo reset.");
  };

  return (
    <div className="app-shell">
      <BoardHeader date={new Date("2026-08-18T09:10:00+05:30")} onReset={resetDemo} />
      <main>
        <section className="intro-block">
          <div>
            <span className="eyebrow">Tuesday relay · Morning → Swing</span>
            <h1>Keep the next shift moving.</h1>
            <p>Review context, clear blockers, and hand off work without losing the thread.</p>
          </div>
          <div className="shift-status"><span aria-hidden="true" />Morning shift · 2h 20m left</div>
        </section>

        <MetricStrip metrics={metrics} />
        <FilterBar
          filters={filters}
          resultCount={visibleHandoffs.length}
          searchInputRef={searchInputRef}
          onChange={setFilters}
          onClear={clearFilters}
        />

        <div className={`board-grid${activeHandoff ? " board-grid--detail" : ""}`}>
          {visibleHandoffs.length > 0 ? (
            <HandoffList
              handoffs={visibleHandoffs}
              peopleById={PEOPLE_BY_ID}
              selectedIds={selectedIds}
              activeId={activeId}
              onToggle={(id) => dispatchSelection({ type: "toggle", id })}
              onToggleAll={toggleVisible}
              onOpen={setActiveId}
            />
          ) : (
            <EmptyState onClear={clearFilters} />
          )}

          {activeHandoff && (
            <DetailPanel
              handoff={activeHandoff}
              owner={PEOPLE_BY_ID[activeHandoff.ownerId]}
              recipient={PEOPLE_BY_ID[activeHandoff.recipientId]}
              onClose={() => setActiveId(null)}
              onToggleChecklist={toggleChecklist}
            />
          )}
        </div>
      </main>

      <BulkActionBar
        selectedCount={selectedIds.size}
        onAcknowledge={acknowledgeSelected}
        onClear={() => dispatchSelection({ type: "clear" })}
      />
      <div className="sr-only" role="status" aria-live="polite">{announcement}</div>
      {hasActiveFilters(filters) && <span className="filter-active-signal" aria-hidden="true" />}
    </div>
  );
}

import type { RefObject } from "react";
import type { HandoffFilters } from "../domain/handoff";

interface FilterBarProps {
  filters: HandoffFilters;
  resultCount: number;
  searchInputRef: RefObject<HTMLInputElement>;
  onChange: (filters: HandoffFilters) => void;
  onClear: () => void;
}

export function FilterBar({
  filters,
  resultCount,
  searchInputRef,
  onChange,
  onClear,
}: FilterBarProps) {
  const update = <Key extends keyof HandoffFilters>(key: Key, value: HandoffFilters[Key]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="filter-bar" aria-label="Filter handoffs">
      <label className="search-field">
        <span className="sr-only">Search handoffs</span>
        <span aria-hidden="true">⌕</span>
        <input
          ref={searchInputRef}
          type="search"
          aria-label="Search handoffs"
          placeholder="Search handoffs"
          value={filters.query}
          onChange={(event) => update("query", event.target.value)}
        />
        <kbd aria-hidden="true" title="Press slash to focus search">/</kbd>
      </label>
      <label>
        <span className="sr-only">Status</span>
        <select value={filters.status} onChange={(event) => update("status", event.target.value as HandoffFilters["status"])}>
          <option value="all">All statuses</option>
          <option value="needs-review">Needs review</option>
          <option value="blocked">Blocked</option>
          <option value="ready">Ready</option>
          <option value="acknowledged">Acknowledged</option>
        </select>
      </label>
      <label>
        <span className="sr-only">Priority</span>
        <select value={filters.priority} onChange={(event) => update("priority", event.target.value as HandoffFilters["priority"])}>
          <option value="all">All priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="normal">Normal</option>
        </select>
      </label>
      <label>
        <span className="sr-only">Shift</span>
        <select value={filters.shift} onChange={(event) => update("shift", event.target.value as HandoffFilters["shift"])}>
          <option value="all">All shifts</option>
          <option value="morning">Morning</option>
          <option value="swing">Swing</option>
          <option value="overnight">Overnight</option>
        </select>
      </label>
      <button type="button" className="text-button filter-bar__clear" onClick={onClear}>Clear</button>
      <span className="result-count" aria-live="polite">{resultCount} {resultCount === 1 ? "handoff" : "handoffs"}</span>
    </section>
  );
}

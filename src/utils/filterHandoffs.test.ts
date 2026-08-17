import { INITIAL_HANDOFFS } from "../data/handoffs";
import { DEFAULT_FILTERS } from "../domain/handoff";
import { filterHandoffs, hasActiveFilters } from "./filterHandoffs";

describe("filterHandoffs", () => {
  it("matches titles, summaries, and labels without case sensitivity", () => {
    expect(filterHandoffs(INITIAL_HANDOFFS, { ...DEFAULT_FILTERS, query: "PAYMENTS" }).map((item) => item.id))
      .toEqual(["refund-queue", "chargeback-evidence"]);
  });

  it("combines facets without mutating the source order", () => {
    const source = [...INITIAL_HANDOFFS];
    const result = filterHandoffs(INITIAL_HANDOFFS, {
      query: "",
      status: "ready",
      priority: "normal",
      shift: "overnight",
    });

    expect(result.map((item) => item.id)).toEqual(["morning-brief"]);
    expect(INITIAL_HANDOFFS).toEqual(source);
  });

  it("recognizes trimmed query input as inactive", () => {
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, query: "   " })).toBe(false);
  });
});

import { selectionReducer } from "./selection";

describe("selectionReducer", () => {
  it("toggles one record without mutating the previous set", () => {
    const initial = new Set(["alpha"]);
    const next = selectionReducer(initial, { type: "toggle", id: "beta" });

    expect([...next]).toEqual(["alpha", "beta"]);
    expect([...initial]).toEqual(["alpha"]);
  });

  it("adds and removes visible IDs while preserving hidden selections", () => {
    const withVisible = selectionReducer(new Set(["hidden"]), {
      type: "select-many",
      ids: ["one", "two"],
    });
    const withoutVisible = selectionReducer(withVisible, {
      type: "remove-many",
      ids: ["one", "two"],
    });

    expect([...withoutVisible]).toEqual(["hidden"]);
  });

  it("clears the full selection", () => {
    expect(selectionReducer(new Set(["one", "two"]), { type: "clear" }).size).toBe(0);
  });
});

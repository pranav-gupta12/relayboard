export type SelectionAction =
  | { type: "toggle"; id: string }
  | { type: "select-many"; ids: string[] }
  | { type: "remove-many"; ids: string[] }
  | { type: "clear" };

export function selectionReducer(state: Set<string>, action: SelectionAction): Set<string> {
  switch (action.type) {
    case "toggle": {
      const next = new Set(state);
      if (next.has(action.id)) next.delete(action.id);
      else next.add(action.id);
      return next;
    }
    case "select-many":
      return new Set([...state, ...action.ids]);
    case "remove-many": {
      const ids = new Set(action.ids);
      return new Set([...state].filter((id) => !ids.has(id)));
    }
    case "clear":
      return new Set();
  }
}

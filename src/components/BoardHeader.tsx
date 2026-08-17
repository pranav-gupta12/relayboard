import { formatDate } from "../utils/format";

interface BoardHeaderProps {
  date: Date;
  onReset: () => void;
}

export function BoardHeader({ date, onReset }: BoardHeaderProps) {
  return (
    <header className="board-header">
      <div className="brand-lockup">
        <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
        <span>
          <strong>Relayboard</strong>
          <small>Northstar operations</small>
        </span>
      </div>
      <div className="board-header__context">
        <span className="eyebrow">Live handoff board</span>
        <span className="board-date">{formatDate(date)}</span>
      </div>
      <div className="board-header__actions">
        <button className="text-button" type="button" onClick={onReset}>Reset demo</button>
        <span className="current-user" aria-label="Signed in as Maya Chen">MC</span>
      </div>
    </header>
  );
}

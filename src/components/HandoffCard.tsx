import type { Handoff, Person } from "../domain/handoff";
import { formatRelativeTime, formatTime } from "../utils/format";
import { Avatar } from "./Avatar";
import { StatusPill } from "./StatusPill";

interface HandoffCardProps {
  handoff: Handoff;
  owner: Person;
  recipient: Person;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export function HandoffCard({
  handoff,
  owner,
  recipient,
  selected,
  active,
  onSelect,
  onOpen,
}: HandoffCardProps) {
  const completed = handoff.checklist.filter((item) => item.complete).length;

  return (
    <article className={`handoff-card${active ? " handoff-card--active" : ""}`}>
      <label className="card-check">
        <input type="checkbox" checked={selected} onChange={onSelect} />
        <span className="sr-only">Select {handoff.title}</span>
      </label>
      <button type="button" className="handoff-card__body" onClick={onOpen} aria-current={active ? "true" : undefined}>
        <span className="handoff-card__topline">
          <span className="handoff-card__pills">
            <StatusPill value={handoff.status} />
            <StatusPill value={handoff.priority} tone="priority" />
          </span>
          <span className="handoff-card__updated">Updated {formatRelativeTime(handoff.updatedAt)}</span>
        </span>
        <strong className="handoff-card__title">{handoff.title}</strong>
        <span className="handoff-card__summary">{handoff.summary}</span>
        <span className="handoff-card__footer">
          <span className="handoff-route">
            <Avatar person={owner} size="small" />
            <span aria-hidden="true">→</span>
            <Avatar person={recipient} size="small" />
            <span className="sr-only">From {owner.name} to {recipient.name}</span>
          </span>
          <span>{formatTime(handoff.dueAt)} deadline</span>
          <span>{completed}/{handoff.checklist.length} checks</span>
        </span>
      </button>
    </article>
  );
}

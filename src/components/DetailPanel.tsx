import type { Handoff, Person } from "../domain/handoff";
import { formatLabel, formatTime } from "../utils/format";
import { Avatar } from "./Avatar";
import { StatusPill } from "./StatusPill";

interface DetailPanelProps {
  handoff: Handoff;
  owner: Person;
  recipient: Person;
  onClose: () => void;
  onToggleChecklist: (itemId: string) => void;
}

export function DetailPanel({
  handoff,
  owner,
  recipient,
  onClose,
  onToggleChecklist,
}: DetailPanelProps) {
  return (
    <aside className="detail-panel" aria-labelledby="detail-title">
      <header className="detail-panel__header">
        <span className="eyebrow">Handoff detail</span>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close handoff detail">×</button>
      </header>
      <div className="detail-panel__pills">
        <StatusPill value={handoff.status} />
        <StatusPill value={handoff.priority} tone="priority" />
      </div>
      <h2 id="detail-title">{handoff.title}</h2>
      <p className="detail-panel__summary">{handoff.summary}</p>

      <dl className="detail-facts">
        <div><dt>Route</dt><dd><Avatar person={owner} showName size="small" /><span aria-hidden="true">→</span><Avatar person={recipient} showName size="small" /></dd></div>
        <div><dt>Shift</dt><dd>{formatLabel(handoff.shift)}</dd></div>
        <div><dt>Deadline</dt><dd>{formatTime(handoff.dueAt)}</dd></div>
      </dl>

      <section className="detail-section" aria-labelledby="checklist-title">
        <div className="detail-section__title"><h3 id="checklist-title">Readiness checklist</h3><span>{handoff.checklist.filter((item) => item.complete).length}/{handoff.checklist.length}</span></div>
        <ul className="checklist">
          {handoff.checklist.map((item) => (
            <li key={item.id}>
              <label>
                <input type="checkbox" checked={item.complete} onChange={() => onToggleChecklist(item.id)} />
                <span>{item.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-section" aria-labelledby="timeline-title">
        <h3 id="timeline-title">Recent context</h3>
        <ol className="timeline">
          {handoff.timeline.map((event) => (
            <li key={event.id}><strong>{event.actor}</strong><p>{event.detail}</p><time dateTime={event.occurredAt}>{formatTime(event.occurredAt)}</time></li>
          ))}
        </ol>
      </section>
    </aside>
  );
}

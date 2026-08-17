import type { BoardMetrics } from "../utils/metrics";

interface MetricStripProps {
  metrics: BoardMetrics;
}

export function MetricStrip({ metrics }: MetricStripProps) {
  return (
    <section className="metric-strip" aria-label="Board summary">
      <div className="metric metric--lead">
        <span className="metric__label">Open handoffs</span>
        <strong>{metrics.open}</strong>
        <span className="metric__note">across three shifts</span>
      </div>
      <div className="metric">
        <span className="metric__marker metric__marker--critical" aria-hidden="true" />
        <span className="metric__label">Critical</span>
        <strong>{metrics.critical}</strong>
      </div>
      <div className="metric">
        <span className="metric__marker metric__marker--blocked" aria-hidden="true" />
        <span className="metric__label">Blocked</span>
        <strong>{metrics.blocked}</strong>
      </div>
      <div className="metric metric--progress">
        <span className="metric__label">Acknowledged</span>
        <strong>{metrics.acknowledged}</strong>
        <span className="progress-track" aria-label={`${metrics.completion}% acknowledged`}>
          <span style={{ width: `${metrics.completion}%` }} />
        </span>
      </div>
    </section>
  );
}

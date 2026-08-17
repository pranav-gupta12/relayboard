interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-state__mark" aria-hidden="true">↳</span>
      <h2>No handoffs match</h2>
      <p>Clear a filter or try a broader search to bring work back into view.</p>
      <button type="button" className="secondary-button" onClick={onClear}>Clear filters</button>
    </div>
  );
}

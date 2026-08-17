interface BulkActionBarProps {
  selectedCount: number;
  onAcknowledge: () => void;
  onClear: () => void;
}

export function BulkActionBar({ selectedCount, onAcknowledge, onClear }: BulkActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-bar" role="region" aria-label="Selected handoff actions">
      <strong>{selectedCount} selected</strong>
      <span className="bulk-bar__spacer" />
      <button type="button" className="text-button text-button--light" onClick={onClear}>Clear selection</button>
      <button type="button" className="primary-button" onClick={onAcknowledge}>Acknowledge selected</button>
    </div>
  );
}

import { SORT_OPTIONS } from '../../types/car';
import type { SortState } from '../../types/car';

interface SortControlsProps {
  sort: SortState;
  sortOptions: typeof SORT_OPTIONS;
  sortLabel: string;
  onChange: (label: string) => void;
}

export function SortControls({ sortLabel, onChange }: SortControlsProps) {
  return (
    <div className="sort-controls">
      <label htmlFor="sort-select">排序：</label>
      <select
        id="sort-select"
        className="sort-select"
        value={sortLabel}
        onChange={(e) => onChange(e.target.value)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.label} value={opt.label}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

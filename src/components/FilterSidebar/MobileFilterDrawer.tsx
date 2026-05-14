import type { FilterState, SortState } from '../../types/car';
import type { SORT_OPTIONS } from '../../types/car';
import { FilterSidebar } from './FilterSidebar';

interface MobileFilterDrawerProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  sort: SortState;
  sortOptions: typeof SORT_OPTIONS;
  sortLabel: string;
  onSortChange: (label: string) => void;
  onClose: () => void;
}

export function MobileFilterDrawer({
  filters,
  onChange,
  onClear,
  sortOptions,
  sortLabel,
  onSortChange,
  onClose,
}: MobileFilterDrawerProps) {
  return (
    <div className="mobile-filter-overlay" onClick={onClose}>
      <div
        className="mobile-filter-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-filter-header">
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>筛选与排序</h3>
          <button className="btn btn-ghost" onClick={onClose}>
            完成
          </button>
        </div>

        {/* Sort section */}
        <div className="sidebar-section">
          <h3>排序</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {sortOptions.map((opt) => (
              <button
                key={opt.label}
                className={`range-preset ${sortLabel === opt.label ? 'active' : ''}`}
                onClick={() => onSortChange(opt.label)}
                style={{ fontSize: '0.8125rem', padding: '6px 14px' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter sections */}
        <FilterSidebar
          filters={filters}
          onChange={onChange}
          onClear={onClear}
        />
      </div>
    </div>
  );
}

import { useMemo } from 'react';
import type { SortState } from '../types/car';
import { DEFAULT_SORT_STATE, SORT_OPTIONS } from '../types/car';

export function useCarSort(sort: SortState, setSort: (s: SortState) => void) {
  const sortLabel = useMemo(() => {
    if (!sort.field) return '默认';
    const opt = SORT_OPTIONS.find(
      (o) => o.field === sort.field && o.direction === sort.direction,
    );
    return opt?.label || '默认';
  }, [sort]);

  const handleSortChange = (label: string) => {
    const opt = SORT_OPTIONS.find((o) => o.label === label);
    if (opt) {
      setSort({ field: opt.field, direction: opt.direction });
    } else {
      setSort(DEFAULT_SORT_STATE);
    }
  };

  return { sortLabel, handleSortChange, sortOptions: SORT_OPTIONS };
}

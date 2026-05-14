import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarSort } from '../../../src/hooks/useCarSort';
import type { SortState } from '../../../src/types/car';
import { DEFAULT_SORT_STATE } from '../../../src/types/car';

describe('useCarSort', () => {
  it('returns default label when no sort active', () => {
    let sort: SortState = DEFAULT_SORT_STATE;
    const setSort = (s: SortState) => {
      sort = s;
    };

    const { result } = renderHook(() => useCarSort(sort, setSort));

    expect(result.current.sortLabel).toBe('默认');
  });

  it('changes sort label on price asc', () => {
    let sort: SortState = DEFAULT_SORT_STATE;
    const setSort = (s: SortState) => {
      sort = s;
    };

    const { result } = renderHook(() => useCarSort(sort, setSort));

    act(() => {
      result.current.handleSortChange('价格从低到高');
    });

    expect(sort.field).toBe('price');
    expect(sort.direction).toBe('asc');
  });

  it('returns correct sort options', () => {
    let sort: SortState = DEFAULT_SORT_STATE;
    const setSort = (s: SortState) => {
      sort = s;
    };

    const { result } = renderHook(() => useCarSort(sort, setSort));

    expect(result.current.sortOptions.length).toBeGreaterThanOrEqual(6);
  });
});

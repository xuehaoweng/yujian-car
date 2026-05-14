import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type {
  FilterState,
  SortState,
  VehicleType,
  FuelType,
} from '../types/car';
import { DEFAULT_FILTER_STATE, DEFAULT_SORT_STATE } from '../types/car';

function parseCommaParam(val: string | null): string[] {
  if (!val) return [];
  return val.split(',').filter(Boolean);
}

function parseNumberParam(val: string | null, fallback: number): number {
  if (val === null) return fallback;
  const n = Number(val);
  return isNaN(n) ? fallback : n;
}

export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: FilterState = useMemo(() => {
    const brands = parseCommaParam(searchParams.get('brand'));
    const priceMin = parseNumberParam(
      searchParams.get('priceMin'),
      DEFAULT_FILTER_STATE.priceRange[0],
    );
    const priceMax = parseNumberParam(
      searchParams.get('priceMax'),
      DEFAULT_FILTER_STATE.priceRange[1],
    );
    const vehicleTypes = parseCommaParam(
      searchParams.get('type'),
    ) as VehicleType[];
    const fuelTypes = parseCommaParam(searchParams.get('fuel')) as FuelType[];
    const dispMin = parseNumberParam(
      searchParams.get('dispMin'),
      DEFAULT_FILTER_STATE.displacementRange[0],
    );
    const dispMax = parseNumberParam(
      searchParams.get('dispMax'),
      DEFAULT_FILTER_STATE.displacementRange[1],
    );

    return {
      brands,
      priceRange: [priceMin, priceMax] as [number, number],
      vehicleTypes,
      fuelTypes,
      displacementRange: [dispMin, dispMax] as [number, number],
    };
  }, [searchParams]);

  const sort: SortState = useMemo(() => {
    const raw = searchParams.get('sort');
    if (!raw) return DEFAULT_SORT_STATE;
    const parts = raw.split('_');
    if (parts.length !== 2) return DEFAULT_SORT_STATE;
    const field = parts[0] as SortState['field'];
    const direction = parts[1] as SortState['direction'];
    if (!['price', 'displacement', 'brand'].includes(field || ''))
      return DEFAULT_SORT_STATE;
    if (!['asc', 'desc'].includes(direction)) return DEFAULT_SORT_STATE;
    return { field, direction };
  }, [searchParams]);

  const setFilters = useCallback(
    (next: FilterState) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next.brands.length > 0) p.set('brand', next.brands.join(','));
          else p.delete('brand');
          if (next.priceRange[0] !== DEFAULT_FILTER_STATE.priceRange[0])
            p.set('priceMin', String(next.priceRange[0]));
          else p.delete('priceMin');
          if (next.priceRange[1] !== DEFAULT_FILTER_STATE.priceRange[1])
            p.set('priceMax', String(next.priceRange[1]));
          else p.delete('priceMax');
          if (next.vehicleTypes.length > 0)
            p.set('type', next.vehicleTypes.join(','));
          else p.delete('type');
          if (next.fuelTypes.length > 0)
            p.set('fuel', next.fuelTypes.join(','));
          else p.delete('fuel');
          if (
            next.displacementRange[0] !==
            DEFAULT_FILTER_STATE.displacementRange[0]
          )
            p.set('dispMin', String(next.displacementRange[0]));
          else p.delete('dispMin');
          if (
            next.displacementRange[1] !==
            DEFAULT_FILTER_STATE.displacementRange[1]
          )
            p.set('dispMax', String(next.displacementRange[1]));
          else p.delete('dispMax');
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (next: SortState) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next.field) {
            p.set('sort', `${next.field}_${next.direction}`);
          } else {
            p.delete('sort');
          }
          return p;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams();
        const sortVal = prev.get('sort');
        if (sortVal) p.set('sort', sortVal);
        return p;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.brands.length > 0) count++;
    if (
      filters.priceRange[0] !== DEFAULT_FILTER_STATE.priceRange[0] ||
      filters.priceRange[1] !== DEFAULT_FILTER_STATE.priceRange[1]
    )
      count++;
    if (filters.vehicleTypes.length > 0) count++;
    if (filters.fuelTypes.length > 0) count++;
    if (
      filters.displacementRange[0] !==
        DEFAULT_FILTER_STATE.displacementRange[0] ||
      filters.displacementRange[1] !== DEFAULT_FILTER_STATE.displacementRange[1]
    )
      count++;
    return count;
  }, [filters]);

  return {
    filters,
    sort,
    setFilters,
    setSort,
    clearFilters,
    activeFilterCount,
  };
}

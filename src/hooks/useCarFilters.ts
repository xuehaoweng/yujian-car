import { useState, useEffect, useRef, useCallback } from 'react';
import type { Car, CarResponse, FilterState } from '../types/car';
import type { ApiError } from '../types/car';
import { getCars } from '../services/carApi';

interface UseCarFiltersReturn {
  cars: Car[];
  total: number;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  retry: () => void;
}

export function useCarFilters(
  filters: FilterState,
  sortField: string | null,
  sortDir: string,
): UseCarFiltersReturn {
  const [cars, setCars] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const latestId = useRef(0);

  const fetch = useCallback(() => {
    const id = ++latestId.current;
    setStatus('loading');
    setErrorMessage(null);

    const sort = sortField
      ? {
          field: sortField as CarResponse['cars'][0] extends infer _
            ? 'price' | 'displacement' | 'brand'
            : never,
          direction: sortDir as 'asc' | 'desc',
        }
      : undefined;

    getCars({ filters, sort } as Parameters<typeof getCars>[0])
      .then((res) => {
        if (id !== latestId.current) return;
        setCars(res.cars);
        setTotal(res.total);
        setStatus('success');
      })
      .catch((err: ApiError) => {
        if (id !== latestId.current) return;
        setErrorMessage(err.message);
        setStatus('error');
      });
  }, [filters, sortField, sortDir]);

  useEffect(() => {
    const timer = setTimeout(fetch, 300);
    return () => clearTimeout(timer);
  }, [fetch]);

  return { cars, total, status, errorMessage, retry: fetch };
}

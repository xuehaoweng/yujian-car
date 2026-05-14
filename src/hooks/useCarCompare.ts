import { useState, useCallback } from 'react';
import type { Car, CompareState } from '../types/car';
import { DEFAULT_COMPARE_STATE } from '../types/car';

interface UseCarCompareReturn {
  compare: CompareState;
  comparedCars: Car[];
  toggleCompare: (id: string) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
}

export function useCarCompare(cars: Car[]): UseCarCompareReturn {
  const [compare, setCompare] = useState<CompareState>(DEFAULT_COMPARE_STATE);

  const comparedCars = cars.filter((c) => compare.carIds.includes(c.id));

  const toggleCompare = useCallback((id: string) => {
    setCompare((prev) => {
      if (prev.carIds.includes(id)) {
        return { carIds: prev.carIds.filter((cid) => cid !== id) };
      }
      if (prev.carIds.length >= 3) return prev;
      return { carIds: [...prev.carIds, id] };
    });
  }, []);

  const removeCompare = useCallback((id: string) => {
    setCompare((prev) => ({
      carIds: prev.carIds.filter((cid) => cid !== id),
    }));
  }, []);

  const clearCompare = useCallback(() => {
    setCompare(DEFAULT_COMPARE_STATE);
  }, []);

  return { compare, comparedCars, toggleCompare, removeCompare, clearCompare };
}

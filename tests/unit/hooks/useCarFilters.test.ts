import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCarFilters } from '../../../src/hooks/useCarFilters';
import * as carApi from '../../../src/services/carApi';
import type { Car, CarResponse } from '../../../src/types/car';
import { DEFAULT_FILTER_STATE } from '../../../src/types/car';

const mockCars: Partial<Car>[] = [
  {
    id: 'car-001',
    brand: '丰田',
    model: '卡罗拉',
    price: 12,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 1.8,
  },
  {
    id: 'car-002',
    brand: '丰田',
    model: '凯美瑞',
    price: 20,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 2.0,
  },
  {
    id: 'car-003',
    brand: '大众',
    model: '朗逸',
    price: 11,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 1.5,
  },
];

describe('useCarFilters', () => {
  it('returns loading then success state', async () => {
    vi.spyOn(carApi, 'getCars').mockResolvedValue({
      cars: mockCars as Car[],
      total: 3,
      filters: {} as CarResponse['filters'],
    });

    const { result } = renderHook(() =>
      useCarFilters(DEFAULT_FILTER_STATE, null, 'asc'),
    );

    // Initial state is idle due to 300ms debounce
    expect(result.current.status).toBe('idle');

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.cars).toHaveLength(3);
    expect(result.current.total).toBe(3);
  });

  it('handles API error state', async () => {
    vi.spyOn(carApi, 'getCars').mockRejectedValue({
      code: 'TIMEOUT',
      message: '请求超时',
    });

    const { result } = renderHook(() =>
      useCarFilters(DEFAULT_FILTER_STATE, null, 'asc'),
    );

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.errorMessage).toBe('请求超时');
  });
});

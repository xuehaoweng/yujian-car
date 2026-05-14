import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarCompare } from '../../../src/hooks/useCarCompare';
import type { Car } from '../../../src/types/car';

const mockCars: Car[] = [
  {
    id: 'car-001',
    brand: '丰田',
    model: '卡罗拉',
    year: 2024,
    price: 12,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 1.8,
    horsepower: 140,
    transmission: 'CVT',
    imageUrl: '',
    description: '',
  },
  {
    id: 'car-002',
    brand: '大众',
    model: '朗逸',
    year: 2024,
    price: 11,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 1.5,
    horsepower: 130,
    transmission: '自动',
    imageUrl: '',
    description: '',
  },
  {
    id: 'car-003',
    brand: '宝马',
    model: '3系',
    year: 2024,
    price: 35,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 2.0,
    horsepower: 184,
    transmission: '自动',
    imageUrl: '',
    description: '',
  },
  {
    id: 'car-004',
    brand: '奔驰',
    model: 'C级',
    year: 2024,
    price: 38,
    vehicleType: '轿车',
    fuelType: '汽油',
    displacement: 2.0,
    horsepower: 204,
    transmission: '自动',
    imageUrl: '',
    description: '',
  },
];

describe('useCarCompare', () => {
  it('adds cars to comparison', () => {
    const { result } = renderHook(() => useCarCompare(mockCars));

    act(() => {
      result.current.toggleCompare('car-001');
    });

    expect(result.current.compare.carIds).toContain('car-001');
    expect(result.current.comparedCars).toHaveLength(1);
  });

  it('removes cars from comparison', () => {
    const { result } = renderHook(() => useCarCompare(mockCars));

    act(() => {
      result.current.toggleCompare('car-001');
    });
    act(() => {
      result.current.toggleCompare('car-001');
    });

    expect(result.current.compare.carIds).toHaveLength(0);
  });

  it('enforces max 3 cars limit', () => {
    const { result } = renderHook(() => useCarCompare(mockCars));

    act(() => {
      result.current.toggleCompare('car-001');
    });
    act(() => {
      result.current.toggleCompare('car-002');
    });
    act(() => {
      result.current.toggleCompare('car-003');
    });
    act(() => {
      result.current.toggleCompare('car-004');
    });

    expect(result.current.compare.carIds).toHaveLength(3);
    expect(result.current.compare.carIds).not.toContain('car-004');
  });

  it('clears all compared cars', () => {
    const { result } = renderHook(() => useCarCompare(mockCars));

    act(() => {
      result.current.toggleCompare('car-001');
    });
    act(() => {
      result.current.toggleCompare('car-002');
    });
    act(() => {
      result.current.clearCompare();
    });

    expect(result.current.compare.carIds).toHaveLength(0);
  });

  it('filters compared cars from the car list', () => {
    const { result } = renderHook(() => useCarCompare(mockCars));

    act(() => {
      result.current.toggleCompare('car-001');
    });
    act(() => {
      result.current.toggleCompare('car-002');
    });

    expect(result.current.comparedCars).toHaveLength(2);
    expect(result.current.comparedCars[0].brand).toBe('丰田');
  });
});

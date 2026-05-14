import type { Car, CarResponse, GetCarsParams, ApiError } from '../types/car';
import { mockCars } from './mockData';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function filterCars(cars: Car[], filters: GetCarsParams['filters']): Car[] {
  if (!filters) return cars;

  return cars.filter((car) => {
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(car.brand)) return false;
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (car.price < min || car.price > max) return false;
    }
    if (filters.vehicleTypes && filters.vehicleTypes.length > 0) {
      if (!filters.vehicleTypes.includes(car.vehicleType)) return false;
    }
    if (filters.fuelTypes && filters.fuelTypes.length > 0) {
      if (!filters.fuelTypes.includes(car.fuelType)) return false;
    }
    if (filters.displacementRange) {
      const [min, max] = filters.displacementRange;
      if (
        car.displacement > 0 &&
        (car.displacement < min || car.displacement > max)
      )
        return false;
    }
    return true;
  });
}

function sortCars(cars: Car[], sort: GetCarsParams['sort']): Car[] {
  if (!sort || !sort.field) return cars;

  const sorted = [...cars];
  const { field, direction } = sort;
  const dir = direction === 'asc' ? 1 : -1;

  sorted.sort((a, b) => {
    let cmp: number;
    if (field === 'price') {
      cmp = a.price - b.price;
    } else if (field === 'displacement') {
      cmp = a.displacement - b.displacement;
    } else {
      cmp = a.brand.localeCompare(b.brand, 'zh-CN');
    }
    return cmp * dir;
  });

  return sorted;
}

export async function getCars(
  params: GetCarsParams = {},
): Promise<CarResponse> {
  const wait = 150 + Math.random() * 150;
  await delay(wait);

  if (Math.random() < 0.02) {
    const error: ApiError = { code: 'TIMEOUT', message: '请求超时，请重试' };
    throw error;
  }

  const filtered = filterCars(mockCars, params.filters);
  const sorted = sortCars(filtered, params.sort);

  const brands = [...new Set(mockCars.map((c) => c.brand))].sort((a, b) =>
    a.localeCompare(b, 'zh-CN'),
  );
  const prices = mockCars.map((c) => c.price);
  const disps = mockCars.map((c) => c.displacement).filter((d) => d > 0);

  return {
    cars: sorted,
    total: sorted.length,
    filters: {
      brands,
      priceRange: [Math.min(...prices), Math.max(...prices)],
      vehicleTypes: ['轿车', 'SUV', 'MPV', '跑车', '皮卡'],
      fuelTypes: ['汽油', '柴油', '纯电动', '插电混动', '油电混动'],
      displacementRange: [Math.min(...disps), Math.max(...disps)],
    },
  };
}

export async function getCarById(id: string): Promise<Car> {
  await delay(100);
  const car = mockCars.find((c) => c.id === id);
  if (!car) {
    const error: ApiError = { code: 'NOT_FOUND', message: '车辆不存在' };
    throw error;
  }
  return car;
}

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from '../../src/App';
import * as carApi from '../../src/services/carApi';
import type { Car, CarResponse } from '../../src/types/car';

const mockCars: Car[] = [
  {
    id: 'car-0001',
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
    id: 'car-0002',
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
    id: 'car-0003',
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
];

describe('Compare Flow Integration', () => {
  beforeEach(() => {
    vi.spyOn(carApi, 'getCars').mockResolvedValue({
      cars: mockCars,
      total: mockCars.length,
      filters: {
        brands: ['丰田', '大众', '宝马'],
        priceRange: [11, 35],
        vehicleTypes: ['轿车'],
        fuelTypes: ['汽油'],
        displacementRange: [1.5, 2.0],
      },
    } as CarResponse);
  });

  it('renders compare buttons on car cards', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    await waitFor(() => {
      const compareButtons = screen.getAllByText('+ 对比');
      expect(compareButtons.length).toBeGreaterThanOrEqual(2);
    });
  });
});

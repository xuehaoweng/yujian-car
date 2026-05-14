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
    description: '2024款丰田卡罗拉',
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
    description: '2024款大众朗逸',
  },
];

describe('Car Detail Integration', () => {
  beforeEach(() => {
    vi.spyOn(carApi, 'getCars').mockResolvedValue({
      cars: mockCars,
      total: mockCars.length,
      filters: {
        brands: ['丰田', '大众'],
        priceRange: [11, 12],
        vehicleTypes: ['轿车'],
        fuelTypes: ['汽油'],
        displacementRange: [1.5, 1.8],
      },
    } as CarResponse);
  });

  it('renders car cards after loading', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText(/卡罗拉/)).toBeInTheDocument();
      expect(screen.getByText(/朗逸/)).toBeInTheDocument();
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import App from '../../src/App';
import * as carApi from '../../src/services/carApi';
import type { Car, CarResponse } from '../../src/types/car';

const mockCars: Car[] = Array.from({ length: 20 }, (_, i) => ({
  id: `car-${String(i + 1).padStart(4, '0')}`,
  brand: i < 10 ? '丰田' : '大众',
  model: i < 10 ? `卡罗拉${i}` : `朗逸${i}`,
  year: 2024,
  price: 10 + i * 2,
  vehicleType: '轿车' as const,
  fuelType: i < 5 ? ('汽油' as const) : ('纯电动' as const),
  displacement: i < 5 ? 1.8 : 0,
  horsepower: 120 + i * 10,
  transmission: '自动' as const,
  imageUrl: '',
  description: '',
}));

describe('Filter and Browse Integration', () => {
  beforeEach(() => {
    vi.spyOn(carApi, 'getCars').mockResolvedValue({
      cars: mockCars,
      total: mockCars.length,
      filters: {
        brands: ['丰田', '大众'],
        priceRange: [10, 48],
        vehicleTypes: ['轿车'],
        fuelTypes: ['汽油', '纯电动'],
        displacementRange: [0, 1.8],
      },
    } as CarResponse);
  });

  it('renders app shell with header and sidebar', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('驭鉴')).toBeInTheDocument();
    });
  });
});

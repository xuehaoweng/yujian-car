import { describe, it, expect } from 'vitest';
import { getCars, getCarById } from '../../../src/services/carApi';

describe('carApi', () => {
  describe('getCars', () => {
    it('returns all cars with no filters', async () => {
      const res = await getCars();
      expect(res.cars.length).toBeGreaterThan(0);
      expect(res.total).toBe(res.cars.length);
    });

    it('filters by brand', async () => {
      const res = await getCars({
        filters: { brands: ['丰田'] },
      });
      expect(res.cars.every((c) => c.brand === '丰田')).toBe(true);
    });

    it('filters by price range', async () => {
      const res = await getCars({
        filters: { priceRange: [10, 20] },
      });
      expect(res.cars.every((c) => c.price >= 10 && c.price <= 20)).toBe(true);
    });

    it('sorts by price ascending', async () => {
      const res = await getCars({
        sort: { field: 'price', direction: 'asc' },
      });
      for (let i = 1; i < res.cars.length; i++) {
        expect(res.cars[i].price).toBeGreaterThanOrEqual(res.cars[i - 1].price);
      }
    });

    it('sorts by brand descending', async () => {
      const res = await getCars({
        sort: { field: 'brand', direction: 'desc' },
      });
      for (let i = 1; i < res.cars.length; i++) {
        expect(
          res.cars[i].brand.localeCompare(res.cars[i - 1].brand, 'zh-CN'),
        ).toBeLessThanOrEqual(0);
      }
    });
  });

  describe('getCarById', () => {
    it('returns car by id', async () => {
      const car = await getCarById('car-0001');
      expect(car.id).toBe('car-0001');
    });

    it('throws on unknown id', async () => {
      await expect(getCarById('nonexistent')).rejects.toEqual({
        code: 'NOT_FOUND',
        message: '车辆不存在',
      });
    });
  });
});

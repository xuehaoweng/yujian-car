# Mock API Contract: Car Data Service

**Type**: Internal service interface (mock implementation)

## `getCars(filters?, sort?): Promise<CarResponse>`

Fetch cars with optional filtering and sorting. Simulates 150-300ms network delay.

### Parameters

```typescript
interface GetCarsParams {
  filters?: Partial<FilterState>;
  sort?: SortState;
}
```

### Response

```typescript
interface CarResponse {
  cars: Car[];
  total: number;           // Total matches before any limit
  filters: AvailableFilters; // Dynamic filter options from dataset
}
```

### Behavior

| Scenario | Response |
|----------|----------|
| No filters | All 500 cars, natural order |
| Filters applied | AND-intersection of all active filter dimensions |
| Zero matches | `{ cars: [], total: 0 }` |
| Sort applied | Results sorted by field+direction on top of filter |
| Network error (simulated) | Rejects after 5s with `{ code: 'TIMEOUT', message: '请求超时' }` |

### Filter Logic

Each filter dimension narrows the result set:
- `brands[]` — `car.brand IN brands`
- `priceRange[min, max]` — `min <= car.price <= max`
- `vehicleTypes[]` — `car.vehicleType IN types`
- `fuelTypes[]` — `car.fuelType IN fuels`
- `displacementRange[min, max]` — `min <= car.displacement <= max`

Empty array = no filter on that dimension.

### Sort Logic

- `price_asc`: lowest price first
- `price_desc`: highest price first
- `displacement_asc`: smallest displacement first
- `displacement_desc`: largest displacement first
- `brand_asc`: A-Z by brand name
- `brand_desc`: Z-A by brand name

---

## `getCarById(id: string): Promise<Car>`

Fetch a single car by ID.

### Error

Throws `{ code: 'NOT_FOUND', message: '车辆不存在' }` if ID not in dataset.

---

## `getAvailableFilters(): Promise<AvailableFilters>`

Returns filter options derived from the full dataset.

```typescript
interface AvailableFilters {
  brands: string[];               // Unique sorted brand names
  priceRange: [number, number];   // [min price in dataset, max price in dataset]
  vehicleTypes: VehicleType[];    // Types present in dataset
  fuelTypes: FuelType[];          // Fuel types present in dataset
  displacementRange: [number, number]; // [min disp, max disp] in dataset
}
```

Used to populate filter UI options dynamically per spec Assumptions section ("derived dynamically from available data set").

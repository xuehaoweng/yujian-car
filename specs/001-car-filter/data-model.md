# Data Model: Car Filter & Browse Application

**Date**: 2026-05-14 | **Feature**: [spec.md](./spec.md)

## Core Entity: Car

```typescript
interface Car {
  id: string;                    // Unique identifier, e.g. "car-001"
  brand: string;                 // 品牌, e.g. "丰田", "大众", "宝马"
  model: string;                 // 型号, e.g. "卡罗拉", "帕萨特", "3系"
  year: number;                  // 年款, range 2015-2026
  price: number;                 // 价格 (万元 RMB), range 5-200
  vehicleType: VehicleType;      // 车型
  fuelType: FuelType;            // 燃油类型
  displacement: number;          // 排量 (L), range 1.0-6.0
  horsepower: number;            // 马力 (匹), range 70-600
  transmission: Transmission;    // 变速箱
  imageUrl: string;              // 车辆图片 URL
  description: string;           // 车辆描述 (1-2 sentences)
}

type VehicleType = '轿车' | 'SUV' | 'MPV' | '跑车' | '皮卡';

type FuelType = '汽油' | '柴油' | '纯电动' | '插电混动' | '油电混动';

type Transmission = '手动' | '自动' | 'CVT' | '双离合';
```

### Validation Rules

| Field | Rule |
|-------|------|
| `id` | Non-empty string, unique |
| `brand` | Non-empty string, from known brand list |
| `model` | Non-empty string |
| `year` | Integer, 2015 ≤ year ≤ 2026 |
| `price` | Number, 5 ≤ price ≤ 200 |
| `vehicleType` | One of: 轿车, SUV, MPV, 跑车, 皮卡 |
| `fuelType` | One of: 汽油, 柴油, 纯电动, 插电混动, 油电混动 |
| `displacement` | Number, 1.0 ≤ displacement ≤ 6.0 (0 for electric vehicles) |
| `horsepower` | Integer, 70 ≤ horsepower ≤ 600 |
| `transmission` | One of: 手动, 自动, CVT, 双离合 |
| `imageUrl` | Valid URL string |
| `description` | String, max 200 chars |

### Derived/Computed Fields

- **priceRange**: computed as `Math.floor(price / 5) * 5` for bucketing into 5万 intervals
- **displacementRange**: computed as `Math.floor(displacement * 2) / 2` for bucketing into 0.5L intervals

---

## Transient State Entities

### FilterState

```typescript
interface FilterState {
  brands: string[];              // Selected brand names (empty = all)
  priceRange: [number, number];  // [min, max] in 万元, e.g. [10, 30]
  vehicleTypes: VehicleType[];   // Selected vehicle types (empty = all)
  fuelTypes: FuelType[];         // Selected fuel types (empty = all)
  displacementRange: [number, number]; // [min, max] in L, e.g. [1.5, 3.0]
}
```

**Default (no filters active)**:
```typescript
const DEFAULT_FILTER_STATE: FilterState = {
  brands: [],
  priceRange: [5, 200],
  vehicleTypes: [],
  fuelTypes: [],
  displacementRange: [1.0, 6.0],
};
```

**Active filter detection**: A filter dimension is "active" when it differs from
the default value. Only active filters appear as chips/badges.

### SortState

```typescript
interface SortState {
  field: 'price' | 'displacement' | 'brand' | null;
  direction: 'asc' | 'desc';
}
```

**Default**: `{ field: null, direction: 'asc' }` — natural order (by id or recommended).

### CompareState

```typescript
interface CompareState {
  carIds: string[];  // Max 3 IDs, ordered by selection time
}
```

### AppState (aggregate root)

```typescript
interface AppState {
  cars: Car[];                   // Full dataset loaded once
  filters: FilterState;
  sort: SortState;
  compare: CompareState;
  selectedCarId: string | null;  // Currently open detail panel
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}
```

---

## Data Flow

```
URL (search params) ──sync──> FilterState + SortState
                                    │
                                    ▼
Mock API (carApi.ts) ────filter/sort──> Car[] (filtered result)
                                    │
                                    ▼
                            CarGrid re-render
                                    │
                        ┌───────────┼───────────┐
                        ▼           ▼           ▼
                   CarCard      CarDetail   CompareDrawer
                   (click)      (overlay)   (multi-select)
```

**State transitions**:
- `idle` → `loading` on first fetch or filter change
- `loading` → `success` when mock API resolves with results
- `loading` → `error` when mock API rejects (simulated network failure)
- `success` → `loading` on subsequent filter/sort changes
- `error` → `loading` on retry

---

## URL Schema

```
/?brand=丰田,大众&priceMin=10&priceMax=30&type=SUV,轿车&fuel=纯电动&dispMin=1.5&dispMax=3.0&sort=price_asc
```

| Param | Type | Example |
|-------|------|---------|
| `brand` | comma-separated strings | `丰田,大众` |
| `priceMin` | number | `10` |
| `priceMax` | number | `30` |
| `type` | comma-separated VehicleType | `SUV,轿车` |
| `fuel` | comma-separated FuelType | `纯电动` |
| `dispMin` | number | `1.5` |
| `dispMax` | number | `3.0` |
| `sort` | `{field}_{dir}` | `price_asc`, `brand_desc` |

All params optional. Omitted = default (no filter on that dimension).

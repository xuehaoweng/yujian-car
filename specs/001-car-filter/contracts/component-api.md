# Component API Contracts

Public interfaces for key components. These define the props each component
exposes — the "contract" between parent and child components.

---

## FilterSidebar

```typescript
interface FilterSidebarProps {
  filters: FilterState;
  available: AvailableFilters;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
  resultCount: number;
}
```

**States**: normal, loading (skeleton placeholders for filter option counts)
**Events**: `onChange` fires on every filter interaction (debounced upstream)

---

## CarGrid

```typescript
interface CarGridProps {
  cars: Car[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  compareIds: string[];
  onCarClick: (id: string) => void;
  onCompareToggle: (id: string) => void;
  onRetry: () => void;
}
```

**States**:
- `loading` → `<LoadingSkeleton count={12} />`
- `success + cars.length > 0` → grid of `<CarCard />`
- `success + cars.length === 0` → `<EmptyState />`
- `error` → `<ErrorState message={errorMessage} onRetry={onRetry} />`

---

## CarCard

```typescript
interface CarCardProps {
  car: Car;
  isCompared: boolean;
  onClick: () => void;
  onCompareToggle: () => void;
}
```

**Renders**: thumbnail, brand, model, year, price badge, fuel type tag.
**States**: default, compared (highlighted border/indicator).

---

## CarDetail

```typescript
interface CarDetailProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  onCompareToggle: () => void;
  isCompared: boolean;
}
```

**Renders**: Full spec table in overlay/panel.
**Animation**: fade + scale on open, reverse on close.

---

## CompareDrawer

```typescript
interface CompareDrawerProps {
  cars: Car[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
}
```

**Renders**: CompareTable when cars.length >= 2. Empty prompt when < 2.
**States**: closed, open-with-1-car (prompt to add more), open-with-2-3-cars (table).

---

## SortControls

```typescript
interface SortControlsProps {
  sort: SortState;
  onChange: (sort: SortState) => void;
}
```

**Options**: 默认, 价格从低到高, 价格从高到低, 排量从小到大, 排量从大到小, 品牌A-Z, 品牌Z-A

---

## Shared Components

### LoadingSkeleton
```typescript
interface LoadingSkeletonProps {
  count: number;       // Number of skeleton cards to render
  type: 'card' | 'detail' | 'table-row';
}
```

### EmptyState
```typescript
interface EmptyStateProps {
  title: string;       // e.g. "没有找到匹配的车辆"
  suggestions: string[]; // e.g. ["尝试扩大价格范围", "减少筛选条件"]
  onClearFilters: () => void;
}
```

### ErrorState
```typescript
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}
```

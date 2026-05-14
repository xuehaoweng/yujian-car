export type VehicleType = '轿车' | 'SUV' | 'MPV' | '跑车' | '皮卡';

export type FuelType = '汽油' | '柴油' | '纯电动' | '插电混动' | '油电混动';

export type Transmission = '手动' | '自动' | 'CVT' | '双离合';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  vehicleType: VehicleType;
  fuelType: FuelType;
  displacement: number;
  horsepower: number;
  transmission: Transmission;
  imageUrl: string;
  description: string;
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  vehicleTypes: VehicleType[];
  fuelTypes: FuelType[];
  displacementRange: [number, number];
}

export interface SortState {
  field: 'price' | 'displacement' | 'brand' | null;
  direction: 'asc' | 'desc';
}

export interface CompareState {
  carIds: string[];
}

export interface CarResponse {
  cars: Car[];
  total: number;
  filters: AvailableFilters;
}

export interface AvailableFilters {
  brands: string[];
  priceRange: [number, number];
  vehicleTypes: VehicleType[];
  fuelTypes: FuelType[];
  displacementRange: [number, number];
}

export interface AppState {
  cars: Car[];
  filters: FilterState;
  sort: SortState;
  compare: CompareState;
  selectedCarId: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
}

export interface GetCarsParams {
  filters?: Partial<FilterState>;
  sort?: SortState;
}

export interface ApiError {
  code: string;
  message: string;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  brands: [],
  priceRange: [5, 200],
  vehicleTypes: [],
  fuelTypes: [],
  displacementRange: [1.0, 6.0],
};

export const DEFAULT_SORT_STATE: SortState = {
  field: null,
  direction: 'asc',
};

export const DEFAULT_COMPARE_STATE: CompareState = {
  carIds: [],
};

export const PRICE_PRESETS = [
  { label: '5万以下', min: 0, max: 5 },
  { label: '5-10万', min: 5, max: 10 },
  { label: '10-15万', min: 10, max: 15 },
  { label: '15-20万', min: 15, max: 20 },
  { label: '20-30万', min: 20, max: 30 },
  { label: '30-50万', min: 30, max: 50 },
  { label: '50万以上', min: 50, max: 200 },
];

export const DISPLACEMENT_PRESETS = [
  { label: '1.5L以下', min: 0, max: 1.5 },
  { label: '1.5-2.0L', min: 1.5, max: 2.0 },
  { label: '2.0-3.0L', min: 2.0, max: 3.0 },
  { label: '3.0L以上', min: 3.0, max: 6.0 },
];

export const SORT_OPTIONS = [
  { label: '默认', field: null, direction: 'asc' as const },
  { label: '价格从低到高', field: 'price' as const, direction: 'asc' as const },
  {
    label: '价格从高到低',
    field: 'price' as const,
    direction: 'desc' as const,
  },
  {
    label: '排量从小到大',
    field: 'displacement' as const,
    direction: 'asc' as const,
  },
  {
    label: '排量从大到小',
    field: 'displacement' as const,
    direction: 'desc' as const,
  },
  { label: '品牌 A-Z', field: 'brand' as const, direction: 'asc' as const },
  { label: '品牌 Z-A', field: 'brand' as const, direction: 'desc' as const },
];

import type { Car } from '../../types/car';
import { CarCard } from './CarCard';
import { LoadingSkeleton, EmptyState, ErrorState } from '../shared';

interface CarGridProps {
  cars: Car[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  compareIds: string[];
  onCarClick: (car: Car) => void;
  onCompareToggle: (id: string) => void;
  onRetry: () => void;
  onClearFilters: () => void;
}

export function CarGrid({
  cars,
  status,
  errorMessage,
  compareIds,
  onCarClick,
  onCompareToggle,
  onRetry,
  onClearFilters,
}: CarGridProps) {
  if (status === 'error') {
    return (
      <ErrorState message={errorMessage || '未知错误'} onRetry={onRetry} />
    );
  }

  if (status === 'loading' && cars.length === 0) {
    return <LoadingSkeleton count={12} type="card" />;
  }

  if (status === 'success' && cars.length === 0) {
    return (
      <EmptyState
        title="没有找到匹配的车辆"
        suggestions={[
          '尝试扩大价格范围',
          '减少品牌或其他筛选条件',
          '清除所有筛选条件后重新选择',
        ]}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="car-grid">
      {status === 'loading' && (
        <div
          style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: 8,
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
          }}
        >
          更新中...
        </div>
      )}
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isCompared={compareIds.includes(car.id)}
          onClick={() => onCarClick(car)}
          onCompareToggle={() => onCompareToggle(car.id)}
        />
      ))}
    </div>
  );
}

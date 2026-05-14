import { memo } from 'react';
import type { Car } from '../../types/car';

interface CarCardProps {
  car: Car;
  isCompared: boolean;
  onClick: () => void;
  onCompareToggle: () => void;
}

export const CarCard = memo(function CarCard({
  car,
  isCompared,
  onClick,
  onCompareToggle,
}: CarCardProps) {
  return (
    <div
      className={`car-card ${isCompared ? 'compared' : ''}`}
      onClick={onClick}
    >
      <img
        className="car-card-image"
        src={car.imageUrl}
        alt={`${car.brand} ${car.model}`}
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23f0f0f0" width="400" height="300"/><text x="200" y="150" text-anchor="middle" dy=".3em" font-size="48">🚗</text></svg>';
        }}
      />
      <div className="car-card-body">
        <div className="car-card-brand">{car.brand}</div>
        <div className="car-card-model">
          {car.model} ({car.year})
        </div>
        <div className="car-card-tags">
          <span className="car-tag">{car.vehicleType}</span>
          <span className="car-tag">{car.fuelType}</span>
          {car.displacement > 0 && (
            <span className="car-tag">{car.displacement}L</span>
          )}
        </div>
        <div className="car-card-footer">
          <span className="car-card-price">
            {car.price}
            <span className="car-card-price-unit"> 万</span>
          </span>
          <button
            className={`compare-checkbox ${isCompared ? 'checked' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onCompareToggle();
            }}
          >
            {isCompared ? '✓ 已选' : '+ 对比'}
          </button>
        </div>
      </div>
    </div>
  );
});

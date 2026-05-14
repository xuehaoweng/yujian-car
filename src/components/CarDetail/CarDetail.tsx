import { useEffect, useCallback } from 'react';
import type { Car } from '../../types/car';

interface CarDetailProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
  onCompareToggle: () => void;
  isCompared: boolean;
}

export function CarDetail({
  car,
  onClose,
  onCompareToggle,
  isCompared,
}: CarDetailProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="关闭">
          ✕
        </button>

        <img
          className="detail-image"
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
        />

        <div className="detail-header">
          <div className="detail-brand">{car.brand}</div>
          <h2>
            {car.model} ({car.year})
          </h2>
        </div>

        <div className="detail-price">
          {car.price}{' '}
          <span style={{ fontSize: '0.875rem', fontWeight: 400 }}>万元</span>
        </div>

        <div className="detail-specs">
          <div className="spec-item">
            <span className="spec-label">车型</span>
            <span className="spec-value">{car.vehicleType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">燃油类型</span>
            <span className="spec-value">{car.fuelType}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">排量</span>
            <span className="spec-value">
              {car.displacement > 0 ? `${car.displacement}L` : '—'}
            </span>
          </div>
          <div className="spec-item">
            <span className="spec-label">马力</span>
            <span className="spec-value">{car.horsepower} 匹</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">变速箱</span>
            <span className="spec-value">{car.transmission}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">年款</span>
            <span className="spec-value">{car.year}</span>
          </div>
        </div>

        <p className="detail-description">{car.description}</p>

        <button
          className={`btn ${isCompared ? 'btn-secondary' : 'btn-primary'}`}
          onClick={onCompareToggle}
        >
          {isCompared ? '取消对比' : '+ 加入对比'}
        </button>
      </div>
    </div>
  );
}

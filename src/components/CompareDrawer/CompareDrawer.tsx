import { useEffect, useCallback } from 'react';
import type { Car } from '../../types/car';
import { CompareTable } from './CompareTable';

interface CompareDrawerProps {
  cars: Car[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CompareDrawer({
  cars,
  onClose,
  onRemove,
  onClear,
}: CompareDrawerProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div
        className="compare-drawer"
        style={{
          position: 'relative',
          maxWidth: 960,
          width: '95%',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="compare-drawer-header">
          <h3>
            车型对比 ({cars.length}/3)
            {cars.length < 2 && ' — 请至少选择2辆车'}
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {cars.length > 0 && (
              <button className="btn btn-ghost" onClick={onClear}>
                清空
              </button>
            )}
            <button className="btn btn-primary" onClick={onClose}>
              关闭
            </button>
          </div>
        </div>
        <div className="compare-drawer-body">
          {cars.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: 40,
                color: 'var(--color-text-secondary)',
              }}
            >
              请从车辆列表中选择要对比的车型
            </div>
          ) : cars.length === 1 ? (
            <div
              style={{
                textAlign: 'center',
                padding: 40,
                color: 'var(--color-text-secondary)',
              }}
            >
              已选择 {cars[0].brand} {cars[0].model}，请再选择至少1辆车进行对比
            </div>
          ) : (
            <CompareTable cars={cars} onRemove={onRemove} />
          )}
        </div>
      </div>
    </div>
  );
}

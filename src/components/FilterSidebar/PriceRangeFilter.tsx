import { useState, useEffect } from 'react';
import { PRICE_PRESETS } from '../../types/car';

interface PriceRangeFilterProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ range, onChange }: PriceRangeFilterProps) {
  const [min, setMin] = useState(String(range[0]));
  const [max, setMax] = useState(String(range[1]));

  useEffect(() => {
    setMin(String(range[0]));
    setMax(String(range[1]));
  }, [range]);

  const handleBlur = () => {
    const nMin = parseFloat(min) || 5;
    const nMax = parseFloat(max) || 200;
    onChange([
      Math.max(5, Math.min(nMin, nMax)),
      Math.min(200, Math.max(nMin, nMax)),
    ]);
  };

  return (
    <div className="range-group">
      <div className="range-inputs">
        <input
          className="range-input"
          type="number"
          min={5}
          max={200}
          value={min}
          onChange={(e) => setMin(e.target.value)}
          onBlur={handleBlur}
        />
        <span className="range-separator">—</span>
        <input
          className="range-input"
          type="number"
          min={5}
          max={200}
          value={max}
          onChange={(e) => setMax(e.target.value)}
          onBlur={handleBlur}
        />
        <span
          style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}
        >
          万元
        </span>
      </div>
      <div className="range-presets">
        {PRICE_PRESETS.map((p) => (
          <button
            key={p.label}
            className={`range-preset ${range[0] === p.min && range[1] === p.max ? 'active' : ''}`}
            onClick={() => onChange([p.min, p.max])}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { DISPLACEMENT_PRESETS } from '../../types/car';

interface DisplacementFilterProps {
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export function DisplacementFilter({
  range,
  onChange,
}: DisplacementFilterProps) {
  const [min, setMin] = useState(String(range[0]));
  const [max, setMax] = useState(String(range[1]));

  useEffect(() => {
    setMin(String(range[0]));
    setMax(String(range[1]));
  }, [range]);

  const handleBlur = () => {
    const nMin = parseFloat(min) || 1.0;
    const nMax = parseFloat(max) || 6.0;
    onChange([
      Math.max(1.0, Math.min(nMin, nMax)),
      Math.min(6.0, Math.max(nMin, nMax)),
    ]);
  };

  return (
    <div className="range-group">
      <div className="range-inputs">
        <input
          className="range-input"
          type="number"
          min={1.0}
          max={6.0}
          step={0.1}
          value={min}
          onChange={(e) => setMin(e.target.value)}
          onBlur={handleBlur}
        />
        <span className="range-separator">—</span>
        <input
          className="range-input"
          type="number"
          min={1.0}
          max={6.0}
          step={0.1}
          value={max}
          onChange={(e) => setMax(e.target.value)}
          onBlur={handleBlur}
        />
        <span
          style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}
        >
          L
        </span>
      </div>
      <div className="range-presets">
        {DISPLACEMENT_PRESETS.map((p) => (
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

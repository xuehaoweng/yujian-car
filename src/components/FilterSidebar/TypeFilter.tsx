import type { VehicleType } from '../../types/car';

const TYPES: VehicleType[] = ['轿车', 'SUV', 'MPV', '跑车', '皮卡'];

interface TypeFilterProps {
  selected: VehicleType[];
  onChange: (types: VehicleType[]) => void;
}

export function TypeFilter({ selected, onChange }: TypeFilterProps) {
  const handleToggle = (type: VehicleType) => {
    if (selected.includes(type)) {
      onChange(selected.filter((t) => t !== type));
    } else {
      onChange([...selected, type]);
    }
  };

  return (
    <div className="checkbox-list">
      {TYPES.map((type) => (
        <label key={type} className="checkbox-item">
          <input
            type="checkbox"
            checked={selected.includes(type)}
            onChange={() => handleToggle(type)}
          />
          {type}
        </label>
      ))}
    </div>
  );
}

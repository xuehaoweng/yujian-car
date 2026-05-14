import type { FuelType } from '../../types/car';

const FUELS: FuelType[] = ['汽油', '柴油', '纯电动', '插电混动', '油电混动'];

interface FuelFilterProps {
  selected: FuelType[];
  onChange: (fuels: FuelType[]) => void;
}

export function FuelFilter({ selected, onChange }: FuelFilterProps) {
  const handleToggle = (fuel: FuelType) => {
    if (selected.includes(fuel)) {
      onChange(selected.filter((f) => f !== fuel));
    } else {
      onChange([...selected, fuel]);
    }
  };

  return (
    <div className="checkbox-list">
      {FUELS.map((fuel) => (
        <label key={fuel} className="checkbox-item">
          <input
            type="checkbox"
            checked={selected.includes(fuel)}
            onChange={() => handleToggle(fuel)}
          />
          {fuel}
        </label>
      ))}
    </div>
  );
}

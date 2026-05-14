import type { Car } from '../../types/car';

interface CompareTableProps {
  cars: Car[];
  onRemove: (id: string) => void;
}

const ROWS: {
  label: string;
  key: keyof Car;
  format?: (val: Car[keyof Car]) => string;
}[] = [
  { label: '品牌', key: 'brand' },
  { label: '车型', key: 'vehicleType' },
  { label: '年款', key: 'year', format: (v) => String(v) },
  { label: '价格', key: 'price', format: (v) => `${v} 万` },
  { label: '燃油类型', key: 'fuelType' },
  {
    label: '排量',
    key: 'displacement',
    format: (v) => (Number(v) > 0 ? `${v}L` : '—'),
  },
  { label: '马力', key: 'horsepower', format: (v) => `${v} 匹` },
  { label: '变速箱', key: 'transmission' },
];

export function CompareTable({ cars, onRemove }: CompareTableProps) {
  const getDiffKeys = (): Set<string> => {
    if (cars.length < 2) return new Set();
    const diff = new Set<string>();
    for (const row of ROWS) {
      const vals = cars.map((c) => c[row.key]);
      const allSame = vals.every((v) => v === vals[0]);
      if (!allSame) diff.add(row.key);
    }
    return diff;
  };

  const diffKeys = getDiffKeys();

  return (
    <table className="compare-table">
      <thead>
        <tr>
          <th>规格</th>
          {cars.map((car) => (
            <th key={car.id}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {car.brand} {car.model}
                <button
                  className="compare-remove-btn"
                  onClick={() => onRemove(car.id)}
                >
                  ✕
                </button>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((row) => (
          <tr key={row.key}>
            <td style={{ fontWeight: 500 }}>{row.label}</td>
            {cars.map((car) => {
              const val = row.format
                ? row.format(car[row.key])
                : String(car[row.key]);
              const isDiff = diffKeys.has(row.key);
              return (
                <td key={car.id} className={isDiff ? 'diff-highlight' : ''}>
                  {val}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

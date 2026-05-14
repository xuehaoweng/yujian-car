import { useMemo } from 'react';
import type { FilterState, VehicleType, FuelType } from '../../types/car';
import { BrandFilter } from './BrandFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { TypeFilter } from './TypeFilter';
import { FuelFilter } from './FuelFilter';
import { DisplacementFilter } from './DisplacementFilter';

const ALL_BRANDS = [
  '丰田',
  '大众',
  '本田',
  '宝马',
  '奔驰',
  '奥迪',
  '比亚迪',
  '日产',
  '吉利',
  '长安',
  '特斯拉',
  '蔚来',
  '小鹏',
  '理想',
  '领克',
  '哈弗',
  '别克',
  '奇瑞',
  '马自达',
  '现代',
  '起亚',
  '福特',
  '雪佛兰',
  '沃尔沃',
  '凯迪拉克',
  '雷克萨斯',
  '保时捷',
  '路虎',
  '捷豹',
  '林肯',
  '红旗',
  '坦克',
  '广汽传祺',
  '五菱',
];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClear: () => void;
}

export function FilterSidebar({
  filters,
  onChange,
  onClear,
}: FilterSidebarProps) {
  const hasActive = useMemo(() => {
    return (
      filters.brands.length > 0 ||
      filters.priceRange[0] > 5 ||
      filters.priceRange[1] < 200 ||
      filters.vehicleTypes.length > 0 ||
      filters.fuelTypes.length > 0 ||
      filters.displacementRange[0] > 1.0 ||
      filters.displacementRange[1] < 6.0
    );
  }, [filters]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <h2 style={{ fontSize: '1rem', fontWeight: 600 }}>筛选条件</h2>
        {hasActive && (
          <button className="filter-clear-btn" onClick={onClear}>
            清除全部
          </button>
        )}
      </div>

      {/* Active filter badges */}
      {hasActive && (
        <div className="filter-badges" style={{ marginBottom: 16 }}>
          {filters.brands.map((b) => (
            <span key={b} className="filter-badge">
              {b}
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={() =>
                  onChange({
                    ...filters,
                    brands: filters.brands.filter((x) => x !== b),
                  })
                }
              >
                ×
              </span>
            </span>
          ))}
          {(filters.priceRange[0] > 5 || filters.priceRange[1] < 200) && (
            <span className="filter-badge">
              {filters.priceRange[0]}-{filters.priceRange[1]}万
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={() => onChange({ ...filters, priceRange: [5, 200] })}
              >
                ×
              </span>
            </span>
          )}
          {filters.vehicleTypes.map((t) => (
            <span key={t} className="filter-badge">
              {t}
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={() =>
                  onChange({
                    ...filters,
                    vehicleTypes: filters.vehicleTypes.filter((x) => x !== t),
                  })
                }
              >
                ×
              </span>
            </span>
          ))}
          {filters.fuelTypes.map((f) => (
            <span key={f} className="filter-badge">
              {f}
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={() =>
                  onChange({
                    ...filters,
                    fuelTypes: filters.fuelTypes.filter((x) => x !== f),
                  })
                }
              >
                ×
              </span>
            </span>
          ))}
          {(filters.displacementRange[0] > 1.0 ||
            filters.displacementRange[1] < 6.0) && (
            <span className="filter-badge">
              {filters.displacementRange[0]}-{filters.displacementRange[1]}L
              <span
                className="close"
                role="button"
                tabIndex={0}
                onClick={() =>
                  onChange({ ...filters, displacementRange: [1.0, 6.0] })
                }
              >
                ×
              </span>
            </span>
          )}
        </div>
      )}

      <div className="sidebar-section">
        <h3>品牌</h3>
        <BrandFilter
          brands={ALL_BRANDS}
          selected={filters.brands}
          available={ALL_BRANDS}
          onChange={(brands) => onChange({ ...filters, brands })}
        />
      </div>

      <div className="sidebar-section">
        <h3>价格区间 (万元)</h3>
        <PriceRangeFilter
          range={filters.priceRange}
          onChange={(priceRange) => onChange({ ...filters, priceRange })}
        />
      </div>

      <div className="sidebar-section">
        <h3>车型</h3>
        <TypeFilter
          selected={filters.vehicleTypes}
          onChange={(vehicleTypes: VehicleType[]) =>
            onChange({ ...filters, vehicleTypes })
          }
        />
      </div>

      <div className="sidebar-section">
        <h3>燃油类型</h3>
        <FuelFilter
          selected={filters.fuelTypes}
          onChange={(fuelTypes: FuelType[]) =>
            onChange({ ...filters, fuelTypes })
          }
        />
      </div>

      <div className="sidebar-section">
        <h3>排量 (L)</h3>
        <DisplacementFilter
          range={filters.displacementRange}
          onChange={(displacementRange) =>
            onChange({ ...filters, displacementRange })
          }
        />
      </div>
    </div>
  );
}

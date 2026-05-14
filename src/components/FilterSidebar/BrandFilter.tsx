import { useState, useMemo } from 'react';

interface BrandFilterProps {
  brands: string[];
  selected: string[];
  available: string[];
  onChange: (brands: string[]) => void;
}

export function BrandFilter({
  selected,
  available,
  onChange,
}: BrandFilterProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return available;
    const q = search.toLowerCase();
    return available.filter((b) => b.toLowerCase().includes(q));
  }, [available, search]);

  const handleToggle = (brand: string) => {
    if (selected.includes(brand)) {
      onChange(selected.filter((b) => b !== brand));
    } else {
      onChange([...selected, brand]);
    }
  };

  return (
    <div>
      <input
        className="brand-search"
        type="text"
        placeholder="搜索品牌..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="checkbox-list">
        {filtered.map((brand) => (
          <label key={brand} className="checkbox-item">
            <input
              type="checkbox"
              checked={selected.includes(brand)}
              onChange={() => handleToggle(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
}

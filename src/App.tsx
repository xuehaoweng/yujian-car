import { useState, useCallback } from 'react';
import { useUrlState } from './hooks/useUrlState';
import { useCarFilters } from './hooks/useCarFilters';
import { useCarSort } from './hooks/useCarSort';
import { useCarCompare } from './hooks/useCarCompare';
import { FilterSidebar } from './components/FilterSidebar/FilterSidebar';
import { CarGrid } from './components/CarGrid/CarGrid';
import { CarDetail } from './components/CarDetail/CarDetail';
import { CompareDrawer } from './components/CompareDrawer/CompareDrawer';
import { SortControls } from './components/SortControls/SortControls';
import { MobileFilterDrawer } from './components/FilterSidebar/MobileFilterDrawer';
import type { Car } from './types/car';

export default function App() {
  const {
    filters,
    sort,
    setFilters,
    setSort,
    clearFilters,
    activeFilterCount,
  } = useUrlState();

  const { cars, total, status, errorMessage, retry } = useCarFilters(
    filters,
    sort.field,
    sort.direction,
  );

  const { sortLabel, handleSortChange, sortOptions } = useCarSort(
    sort,
    setSort,
  );

  const { compare, comparedCars, toggleCompare, removeCompare, clearCompare } =
    useCarCompare(cars);

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const handleCarClick = useCallback((car: Car) => {
    setSelectedCar(car);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedCar(null);
  }, []);

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>驭鉴</h1>
        <span className="result-count">
          {status === 'loading' ? '搜索中...' : `共 ${total} 辆车`}
        </span>
      </header>

      <div className="app-main">
        {/* Desktop Sidebar */}
        <aside className="sidebar">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
          />
        </aside>

        {/* Mobile Filter Toggle */}
        <button
          className="mobile-filter-toggle"
          onClick={() => setMobileFilterOpen(true)}
        >
          筛选与排序
          {activeFilterCount > 0 && (
            <span className="badge">{activeFilterCount}</span>
          )}
        </button>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <MobileFilterDrawer
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
            sort={sort}
            sortOptions={sortOptions}
            sortLabel={sortLabel}
            onSortChange={handleSortChange}
            onClose={() => setMobileFilterOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="content">
          <div className="content-header">
            <SortControls
              sort={sort}
              sortOptions={sortOptions}
              sortLabel={sortLabel}
              onChange={handleSortChange}
            />
          </div>

          <CarGrid
            cars={cars}
            status={status}
            errorMessage={errorMessage}
            compareIds={compare.carIds}
            onCarClick={handleCarClick}
            onCompareToggle={toggleCompare}
            onRetry={retry}
            onClearFilters={clearFilters}
          />
        </main>
      </div>

      {/* Car Detail Panel */}
      {selectedCar && (
        <CarDetail
          car={selectedCar}
          isOpen={!!selectedCar}
          onClose={handleCloseDetail}
          onCompareToggle={() => toggleCompare(selectedCar.id)}
          isCompared={compare.carIds.includes(selectedCar.id)}
        />
      )}

      {/* Compare Floating Bar */}
      {compare.carIds.length > 0 && !compareOpen && (
        <div className="compare-bar" onClick={() => setCompareOpen(true)}>
          对比车型
          <span className="badge">{compare.carIds.length}</span>
          {compare.carIds.length < 2 && ' (请至少选择2辆)'}
        </div>
      )}

      {/* Compare Drawer */}
      {compareOpen && (
        <CompareDrawer
          cars={comparedCars}
          isOpen={compareOpen}
          onClose={() => setCompareOpen(false)}
          onRemove={removeCompare}
          onClear={clearCompare}
        />
      )}
    </div>
  );
}

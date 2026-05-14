# Implementation Plan: Car Filter & Browse Application

**Branch**: `001-car-filter` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-car-filter/spec.md`

## Summary

Build a single-page car filtering and browsing application with multi-dimensional
filters (brand, price range, vehicle type, fuel type, displacement), sortable
result grid, car detail panel, and side-by-side comparison (up to 3 cars). The
app uses React + TypeScript with mock API data, responsive layout (desktop sidebar
→ mobile bottom sheet), URL-based state persistence, and loading/empty/error state
handling per constitution principles.

## Technical Context

**Language/Version**: TypeScript 5.x, React 18+
**Primary Dependencies**: React, React Router DOM (URL state), CSS Modules or Tailwind CSS
**Storage**: N/A (mock data in-memory; no persistence layer)
**Testing**: Vitest + React Testing Library (unit + integration), Playwright (E2E smoke)
**Target Platform**: Modern browsers (Chrome/Firefox/Safari/Edge latest 2 versions), responsive 320px–1920px
**Project Type**: single-page web application (frontend-only SPA)
**Performance Goals**: Initial load < 2s (SC-006), filter response < 300ms perceived (SC-002), FCP < 1.5s, TTI < 3s
**Constraints**: Zero backend dependencies (mock data only), bundle < 200KB gzipped, no authentication required
**Scale/Scope**: ~500 vehicle records, ~10 UI components, 5 user stories

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Code Quality | ✅ PASS | ESLint + Prettier configured in CI; complexity gates enforced per function |
| II. Testing Standards | ✅ PASS | Test-first: unit tests (Jest/RTL), integration tests (user journey), E2E smoke (Playwright) |
| III. Experience Consistency | ✅ PASS | Shared design tokens, reusable LoadingSpinner/EmptyState/ErrorState components, RESTful mock API contract |
| IV. Performance Requirements | ✅ PASS | Debounced filters (300ms), lazy-loaded detail panel, CSS containment on grid cards, Lighthouse budget enforced |

**Gate Result**: All principles pass. No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-car-filter/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (component API + mock API contracts)
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── FilterSidebar/
│   │   ├── FilterSidebar.tsx
│   │   ├── BrandFilter.tsx
│   │   ├── PriceRangeFilter.tsx
│   │   ├── TypeFilter.tsx
│   │   ├── FuelFilter.tsx
│   │   └── DisplacementFilter.tsx
│   ├── CarGrid/
│   │   ├── CarGrid.tsx
│   │   └── CarCard.tsx
│   ├── CarDetail/
│   │   └── CarDetail.tsx
│   ├── CompareDrawer/
│   │   ├── CompareDrawer.tsx
│   │   └── CompareTable.tsx
│   ├── SortControls/
│   │   └── SortControls.tsx
│   └── shared/
│       ├── LoadingSkeleton.tsx
│       ├── EmptyState.tsx
│       └── ErrorState.tsx
├── hooks/
│   ├── useCarFilters.ts
│   ├── useCarSort.ts
│   ├── useCarCompare.ts
│   └── useUrlState.ts
├── services/
│   ├── carApi.ts          # Mock API service
│   └── mockData.ts        # 500-vehicle dataset
├── types/
│   └── car.ts             # Car, FilterState, SortState types
├── constants/
│   └── filters.ts         # Filter option definitions
├── App.tsx
├── main.tsx
└── index.css

tests/
├── unit/
│   ├── hooks/
│   │   ├── useCarFilters.test.ts
│   │   ├── useCarSort.test.ts
│   │   └── useCarCompare.test.ts
│   └── services/
│       └── carApi.test.ts
├── integration/
│   ├── filter-and-sort.test.tsx
│   ├── car-detail.test.tsx
│   └── compare-flow.test.tsx
└── e2e/
    └── smoke.spec.ts
```

**Structure Decision**: Single project (Option 1) — this is a frontend-only SPA with no backend. All logic runs client-side against mock data. Component-per-feature-folder pattern with co-located tests mirrors project conventions.

## Complexity Tracking

> No violations to justify. All constitution gates pass.

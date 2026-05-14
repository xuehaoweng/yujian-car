# Tasks: Car Filter & Browse Application

**Input**: Design documents from `/specs/001-car-filter/`

**Prerequisites**: plan.md (required), spec.md (required), data-model.md, contracts/

**Tests**: The constitution mandates test-first (Principle II: NON-NEGOTIABLE). Test tasks included for all user stories — write tests FIRST, verify they FAIL, then implement.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- Include exact file paths in descriptions

## Path Conventions

- Single project: `src/`, `tests/` at repository root
- Components: `src/components/<ComponentName>/`
- Hooks: `src/hooks/`
- Services: `src/services/`
- Types: `src/types/`
- Constants: `src/constants/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, tooling, and basic structure

- [x] T001 Create project directory structure per plan.md (src/components/, src/hooks/, src/services/, src/types/, src/constants/, tests/unit/, tests/integration/, tests/e2e/)
- [x] T002 Initialize Vite + React 18 + TypeScript 5 project with npm; install dependencies (react, react-dom, react-router-dom); install devDependencies (vitest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @playwright/test, eslint, prettier, typescript, @types/react, @types/react-dom)
- [x] T003 [P] Configure ESLint (flat config) and Prettier in eslint.config.mjs and .prettierrc
- [x] T004 [P] Configure Vitest with jsdom environment in vitest.config.ts
- [x] T005 [P] Configure Playwright for E2E with chromium + mobile viewport in playwright.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, data, API, and shared components that ALL user stories depend on

**CRITICAL**: No user story work begins until this phase is complete

- [x] T006 Create TypeScript types (Car, VehicleType, FuelType, Transmission, FilterState, SortState, CompareState, AppState, CarResponse, AvailableFilters) in src/types/car.ts per data-model.md
- [x] T007 Create mock car dataset (500 vehicles) with all required fields in src/services/mockData.ts
- [x] T008 Implement mock API service (getCars, getCarById, getAvailableFilters) with simulated 150-300ms delay in src/services/carApi.ts per contracts/car-api.md
- [x] T009 [P] Create shared UI components (LoadingSkeleton, EmptyState, ErrorState) in src/components/shared/ per contracts/component-api.md
- [x] T010 Implement useUrlState hook (URL search params ↔ React state sync for filter + sort) in src/hooks/useUrlState.ts
- [x] T011 Create App shell layout: sidebar + main content area, CSS custom properties (design tokens), responsive breakpoints in src/App.tsx, src/main.tsx, src/index.css

**Checkpoint**: Foundation ready — types, mock API, shared components, URL state sync, and app shell all functional. User story implementation can begin.

---

## Phase 3: User Story 1 - Browse & Filter Cars (Priority: P1)

**Goal**: User opens app, sees filter sidebar with brand/price/type/fuel/displacement controls, applies filters (AND logic), sees results update in real time with match count.

**Independent Test**: Apply brand filter → verify matching cars only. Add price range → verify further narrowing. Clear filters → verify full catalog returns.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T012 [P] [US1] Unit test for useCarFilters hook (AND logic, filter combinations, clear single/all filters) in tests/unit/hooks/useCarFilters.test.ts
- [x] T013 [P] [US1] Integration test for filter-and-browse user journey in tests/integration/filter-and-browse.test.tsx

### Implementation for User Story 1

- [x] T014 [P] [US1] Create filter constants (brand list, price ranges, vehicle types, fuel types, displacement ranges) in src/constants/filters.ts
- [x] T015 [US1] Implement useCarFilters hook (filter state management, AND-intersection logic, debounce 300ms) in src/hooks/useCarFilters.ts
- [x] T016 [P] [US1] Create BrandFilter component (multi-select checkboxes with search) in src/components/FilterSidebar/BrandFilter.tsx
- [x] T017 [P] [US1] Create PriceRangeFilter component (dual range slider + preset interval buttons) in src/components/FilterSidebar/PriceRangeFilter.tsx
- [x] T018 [P] [US1] Create TypeFilter + FuelFilter + DisplacementFilter components in src/components/FilterSidebar/TypeFilter.tsx, FuelFilter.tsx, DisplacementFilter.tsx
- [x] T019 [US1] Create FilterSidebar container (layout, active filter badges, clear-all button, result count display) in src/components/FilterSidebar/FilterSidebar.tsx
- [x] T020 [US1] Create CarGrid + CarCard components (responsive grid, thumbnail, brand, model, price, fuel tag, loading/empty/error states) in src/components/CarGrid/CarGrid.tsx and src/components/CarGrid/CarCard.tsx
- [x] T021 [US1] Wire FilterSidebar + CarGrid into App.tsx with URL state persistence (FR-015)

**Checkpoint**: User Story 1 fully functional and independently testable. Users can browse and filter cars with real-time updates.

---

## Phase 4: User Story 2 - Sort & View Results (Priority: P1)

**Goal**: User sorts filtered results by price, displacement, or brand (asc/desc). Sort persists across filter changes. Active sort indicator visible.

**Independent Test**: Apply filter → change sort to "价格从低到高" → verify reorder. Switch to opposite direction → verify. Change filters → verify sort persists.

### Tests for User Story 2

- [x] T022 [P] [US2] Unit test for useCarSort hook (sort field switching, direction toggle, persistence) in tests/unit/hooks/useCarSort.test.ts

### Implementation for User Story 2

- [x] T023 [US2] Implement useCarSort hook (sort state, field switching, direction toggle) in src/hooks/useCarSort.ts
- [x] T024 [US2] Create SortControls component (dropdown with 7 options: default + 3 fields × 2 directions, active indicator) in src/components/SortControls/SortControls.tsx
- [x] T025 [US2] Wire SortControls into App.tsx; integrate sort with existing filters; ensure sort persists in URL params
- [x] T026 [US2] Update CarGrid to apply sort order from SortState on filtered results

**Checkpoint**: Users can sort filtered results. Sort and filter states coexist in URL. US1 + US2 both work together.

---

## Phase 5: User Story 3 - View Car Details (Priority: P2)

**Goal**: User clicks car card → detail panel/overlay opens with all specifications. Close returns to filtered results preserving state.

**Independent Test**: Click car card → detail panel opens with all specs. Close panel → same filter/sort state preserved.

### Tests for User Story 3

- [x] T027 [P] [US3] Integration test for car detail flow (open, verify fields, close, verify state preserved) in tests/integration/car-detail.test.tsx

### Implementation for User Story 3

- [x] T028 [US3] Create CarDetail component (overlay/panel with full spec table, close button, backdrop click, compare toggle button) in src/components/CarDetail/CarDetail.tsx
- [x] T029 [US3] Wire CarDetail into App.tsx: open on CarCard click, close on backdrop/button, preserve filter/sort state
- [x] T030 [US3] Add CSS animations for CarDetail open/close (fade + scale transitions)

**Checkpoint**: Users can view full car details and return to filtered results. US1 + US2 + US3 all functional.

---

## Phase 6: User Story 4 - Compare Cars (Priority: P2)

**Goal**: User selects 2-3 cars for side-by-side comparison table. Differences highlighted. Max 3 cars enforced.

**Independent Test**: Select 2 cars → comparison table appears. Add 3rd → expands. Attempt 4th → blocked with message. Remove car → table updates.

### Tests for User Story 4

- [x] T031 [P] [US4] Unit test for useCarCompare hook (add/remove, max-3 limit, selection state) in tests/unit/hooks/useCarCompare.test.ts
- [x] T032 [P] [US4] Integration test for comparison flow (select, view table, remove, max limit) in tests/integration/compare-flow.test.tsx

### Implementation for User Story 4

- [x] T033 [US4] Implement useCarCompare hook (add/remove car IDs, max 3 enforcement, selection state) in src/hooks/useCarCompare.ts
- [x] T034 [P] [US4] Create CompareTable component (side-by-side spec rows, difference highlighting per FR-010, "—" for missing fields) in src/components/CompareDrawer/CompareTable.tsx
- [x] T035 [US4] Create CompareDrawer component (slide-up drawer with CompareTable, remove buttons, close, empty prompt when < 2 cars) in src/components/CompareDrawer/CompareDrawer.tsx
- [x] T036 [US4] Add compare toggle buttons to CarCard and CarDetail components
- [x] T037 [US4] Wire CompareDrawer into App.tsx; manage compare state; show active compare count badge

**Checkpoint**: Users can compare 2-3 cars side-by-side with difference highlighting. All P1+P2 stories functional.

---

## Phase 7: User Story 5 - Mobile Responsive Experience (Priority: P3)

**Goal**: On viewports < 768px, filter sidebar becomes bottom sheet toggle; car grid → single column; comparison stacks/horizontally scrolls.

**Independent Test**: Open app at 375px width → verify filter toggle visible, sidebar hidden → open bottom sheet → apply filter → close → verify results.

### Tests for User Story 5

- [x] T038 [P] [US5] E2E test: mobile filter flow (375px viewport, bottom sheet open/close, filter apply, result verify) in tests/e2e/mobile-filter.spec.ts

### Implementation for User Story 5

- [x] T039 [US5] Add mobile responsive CSS: media query breakpoints at 768px, filter sidebar → bottom sheet, grid 3→2→1 column, touch targets ≥ 44px in src/index.css
- [x] T040 [US5] Create MobileFilterDrawer component (bottom sheet toggle button, slide-up overlay, close gesture/button) — reuse FilterSidebar content
- [x] T041 [US5] Adapt CompareTable for mobile: horizontal scroll or stacked card layout
- [x] T042 [US5] Adapt CarDetail for mobile: full-screen overlay instead of side panel

**Checkpoint**: Application fully functional and usable on viewports 320px–1920px. All 5 user stories complete.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final quality, performance, and validation across all stories

- [x] T043 [P] E2E smoke test: desktop browse→filter→sort→compare flow in tests/e2e/smoke.spec.ts
- [x] T044 [P] E2E smoke test: mobile browse→filter→detail→compare flow in tests/e2e/mobile-smoke.spec.ts
- [x] T045 Performance optimization: React.memo on CarCard, CSS containment on grid items, lazy image loading, verify bundle < 200KB gzipped
- [x] T046 Validate quickstart.md instructions (run all commands, verify they work on clean checkout)
- [x] T047 [P] Run ESLint and TypeScript typecheck; fix any issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Story 2 (Phase 4)**: Depends on Foundational + US1 (CarGrid must exist for sort integration)
- **User Story 3 (Phase 5)**: Depends on Foundational + US1 (CarGrid required)
- **User Story 4 (Phase 6)**: Depends on Foundational + US1 + US3 (CarDetail must exist for compare toggle)
- **User Story 5 (Phase 7)**: Depends on US1–US4 (adapts existing components)
- **Polish (Phase 8)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Foundation-only — no other story dependencies
- **US2 (P1)**: Depends on US1 (sorts CarGrid results; CarGrid built in US1)
- **US3 (P2)**: Depends on US1 (detail triggered from CarCard in CarGrid)
- **US4 (P2)**: Depends on US3 (compare toggle lives on CarDetail)
- **US5 (P3)**: Depends on US1–US4 (adapts all components for mobile)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Hooks before components
- Sub-components before container components
- Container before App.tsx wiring
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004, T005)
- Foundational shared components (T009) parallel with T008, T010
- Within US1: T012, T013 (tests) can run in parallel; T016, T017, T018 (sub-filters) can run in parallel
- US2 tests (T022) can start while US1 implementation is finishing
- Within US4: T031, T032 tests parallel; T034 parallel with T033

---

## Parallel Example: User Story 1

```bash
# Step 1: Launch all tests for US1 together:
Task: "Unit test for useCarFilters hook in tests/unit/hooks/useCarFilters.test.ts"
Task: "Integration test for filter-and-browse in tests/integration/filter-and-browse.test.tsx"

# Step 2: After tests fail, launch all filter sub-components together:
Task: "Create BrandFilter in src/components/FilterSidebar/BrandFilter.tsx"
Task: "Create PriceRangeFilter in src/components/FilterSidebar/PriceRangeFilter.tsx"
Task: "Create TypeFilter + FuelFilter + DisplacementFilter components"

# Step 3: Sequential (depends on sub-components):
Task: "Create FilterSidebar container in src/components/FilterSidebar/FilterSidebar.tsx"
Task: "Create CarGrid + CarCard in src/components/CarGrid/"
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (Browse & Filter)
4. Complete Phase 4: User Story 2 (Sort)
5. **STOP and VALIDATE**: Independently test filtering + sorting together
6. Deploy/demo if ready (core value delivered)

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → Filter & browse works → Demo
3. Add US2 → Sort works on top of filters → Demo
4. Add US3 → Car details viewable → Demo
5. Add US4 → Comparison table → Demo
6. Add US5 → Mobile responsive → Demo
7. Polish → Production ready

### Parallel Team Strategy

With multiple developers:
1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 (Filtering) + US2 (Sorting)
   - Developer B: US3 (Details) → US4 (Comparison)
   - Developer C: US5 (Mobile) after US1–US4 components exist
3. Polish phase: all developers

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to user story for traceability
- Each user story independently completable and testable
- Verify tests FAIL before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- US2 depends on US1 for CarGrid; US3 depends on US1 for CarCard; US4 depends on US3 for CarDetail; US5 depends on all for mobile adaptation

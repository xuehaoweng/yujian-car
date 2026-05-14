# Quickstart: Car Filter & Browse Application

## Prerequisites

- Node.js 18+
- npm 9+ (or pnpm/yarn)

## Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Type check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build
```

## Project Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm test` | Run Vitest unit + integration tests |
| `npm run test:e2e` | Run Playwright E2E smoke tests |
| `npm run typecheck` | TypeScript type checking (no emit) |
| `npm run lint` | ESLint static analysis |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

## Architecture Overview

```
Browser URL (search params)  ←→  useUrlState hook
        │
        ▼
   AppState (context)
        │
   ┌────┼────────┬──────────┐
   ▼    ▼        ▼          ▼
Filter  Sort   CarGrid   Compare
Sidebar Ctrls   │        Drawer
              CarCard
                │
            CarDetail
```

**Data flow**: URL search params are the source of truth for filter + sort state.
`useUrlState` syncs URL ↔ React state bidirectionally. Mock API (`carApi.ts`)
reads filter/sort state and returns filtered results with simulated delay.

## Key Files

| File | Purpose |
|------|---------|
| `src/types/car.ts` | All TypeScript type definitions |
| `src/services/mockData.ts` | 500-vehicle static dataset |
| `src/services/carApi.ts` | Mock API with simulated delay |
| `src/hooks/useUrlState.ts` | URL search params ↔ state sync |
| `src/hooks/useCarFilters.ts` | Filter logic (AND intersection) |
| `src/hooks/useCarSort.ts` | Sort logic |
| `src/hooks/useCarCompare.ts` | Comparison state (max 3) |
| `src/App.tsx` | Root layout: sidebar + main content |

## Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| ≥ 1024px | Sidebar (280px) + 3-column grid |
| 768–1023px | Sidebar (240px) + 2-column grid |
| < 768px | Hidden sidebar → bottom sheet toggle + 1-column list |

## Testing Strategy

1. **Unit tests** (`tests/unit/`): Hooks, filter/sort logic, API service
2. **Integration tests** (`tests/integration/`): Full user journeys per story
3. **E2E tests** (`tests/e2e/`): Critical smoke tests across viewport sizes

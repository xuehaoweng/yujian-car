# 驭鉴 · YùJiàn

Curate your next car — multi-dimensional filtering, side-by-side comparison, precision matching.

## Features

- **Multi-dimensional filters** — Brand, price range, vehicle type, fuel type, displacement with AND logic
- **Flexible sorting** — Price, displacement, horsepower, newest arrivals
- **Car comparison** — Up to 3 cars side-by-side with diff highlighting
- **Detail cards** — Full specs + description overlay
- **Mobile responsive** — Bottom-sheet filter drawer, single-column grid
- **URL state sync** — Filter/sort params in URL for sharing and browser navigation

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 |
| Routing | React Router 6 |
| Testing | Vitest + React Testing Library + Playwright |
| Data | Mock API (332 cars, 33 brands) |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Run unit & integration tests
npm test

# Run E2E tests
npx playwright test
```

## Project Structure

```
src/
├── components/
│   ├── FilterSidebar/    # Filter sidebar + mobile bottom drawer
│   ├── CarGrid/          # Car card grid
│   ├── CarDetail/        # Car detail overlay
│   ├── CompareDrawer/    # Comparison panel
│   └── shared/           # Loading/Empty/Error state components
├── hooks/                # useUrlState, useCarFilters, useCarSort, useCarCompare
├── services/             # Mock API + data generation
├── types/                # TypeScript type definitions
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## License

MIT

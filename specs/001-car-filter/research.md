# Research: Car Filter & Browse Application

**Date**: 2026-05-14 | **Feature**: [spec.md](./spec.md)

## 1. React + TypeScript Setup

**Decision**: Vite + React 18 + TypeScript 5
**Rationale**: Vite is the current standard for new React SPAs. Fast HMR, native TS
support, optimized production builds. Create React App is deprecated.
**Alternatives considered**:
- Create React App: deprecated, slower dev experience
- Next.js: overkill for a client-side-only SPA with no SSR/SSG needs

## 2. State Management Strategy

**Decision**: URL search params + React context for cross-component state. No external
state library.
**Rationale**: FR-015 requires URL persistence for filter/sort state. React Router's
`useSearchParams` provides native URL sync. Context wraps the remaining transient
state (comparison selection, detail panel open/close). The state graph is shallow
enough that Redux/Zustand would add unnecessary complexity.
**Alternatives considered**:
- Redux Toolkit: overkill for 4 pieces of state
- Zustand: viable but adds dependency without clear benefit over context + URL
- Jotai: same rationale as Zustand

## 3. Mock API Design

**Decision**: In-memory array with synchronous filter/sort + `setTimeout`-wrapped
async functions that simulate 150-300ms network delay.
**Rationale**: No external mocking library needed for this scope. The mock delay
must be tunable to test loading states and debounce behavior. 500 records fit
comfortably in memory (est. ~200KB of JSON).
**Alternatives considered**:
- MSW (Mock Service Worker): powerful but adds setup complexity; better suited
  for projects with real API backends later
- json-server: requires separate process; not needed for client-side-only

## 4. Styling Approach

**Decision**: CSS Modules with CSS custom properties (design tokens).
**Rationale**: Scoped styles prevent leakage, no runtime cost, full CSS feature
support. CSS custom properties enable theming and consistent spacing/colors per
constitution Principle III (Experience Consistency). Tailwind considered but adds
build dependency and HTML verbosity without clear benefit for ~10 components.
**Alternatives considered**:
- Tailwind CSS: faster prototyping but utility-class verbosity can obscure component
  structure; constitution Principle I mandates readability
- Styled Components: runtime CSS-in-JS adds bundle weight; CSS Modules are zero-runtime
- Vanilla CSS: no scoping, potential naming conflicts

## 5. Testing Strategy

**Decision**: Vitest + React Testing Library for unit/integration tests. Playwright
for E2E smoke tests on critical user journeys.
**Rationale**: Vitest is faster and better integrated with Vite than Jest. RTL
enforces testing user behavior, not implementation details — aligns with constitution
Principle II (test what matters). Playwright covers real-browser mobile viewport
testing for User Story 5.
**Alternatives considered**:
- Jest: slower config, needs additional Vite transform plugin
- Cypress: heavier than Playwright for simple smoke tests
- No E2E: rejected — constitution Principle II requires UI smoke tests

## 6. Mobile Responsiveness

**Decision**: CSS media queries with breakpoint at 768px. Filter sidebar transforms
to a fixed-position bottom sheet with slide-up animation. Car grid switches from
3-column (desktop) → 2-column (tablet) → 1-column (mobile).
**Rationale**: CSS-only responsive layout keeps JS bundle lighter. The bottom sheet
pattern is a well-established mobile UX convention. Touch targets minimum 44x44px
per WCAG guidelines.
**Alternatives considered**:
- JS-based adaptive rendering: adds complexity and hydration mismatch risk
- Separate mobile page: violates Principle III consistency mandate

## 7. Performance Optimization

**Decision**: Debounce filter inputs (300ms per FR-016), `React.memo` on CarCard
components, CSS containment on grid items, lazy-load car images with loading="lazy".
**Rationale**: Multiple layers of optimization targeting different bottlenecks:
input debouncing reduces state updates, memo prevents unnecessary re-renders, CSS
containment isolates layout recalc, native lazy loading avoids JS image libraries.
**Bundle budget**: < 200KB gzipped total (React ~45KB + app code ~50KB target).

## Summary of Choices

| Area | Choice | Key Reason |
|------|--------|------------|
| Build tool | Vite | Fast, standard, TypeScript-native |
| Framework | React 18 | User-specified |
| Language | TypeScript 5 | User-specified |
| State | URL params + Context | Simplicity, URL persistence |
| Mock API | In-memory + setTimeout | No external deps needed |
| Styling | CSS Modules + tokens | Scoped, zero-runtime, readable |
| Unit tests | Vitest + RTL | Fast, behavior-focused |
| E2E tests | Playwright | Real browser, mobile viewport support |
| Responsive | CSS media queries | No JS overhead |

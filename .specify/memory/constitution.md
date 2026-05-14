<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial constitution)
  Principles defined:
    - I. Code Quality (NEW)
    - II. Testing Standards (NEW)
    - III. Experience Consistency (NEW)
    - IV. Performance Requirements (NEW)
  Added sections:
    - Security & Compliance Standards
    - Development Workflow & Quality Gates
  Removed sections: None
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ reviewed (Constitution Check section aligns)
    - .specify/templates/spec-template.md ✅ reviewed (Requirements + Success Criteria align)
    - .specify/templates/tasks-template.md ✅ reviewed (Test-first + phase structure align)
    - .specify/templates/checklist-template.md ✅ reviewed (generic, no conflicts)
    - .specify/templates/constitution-template.md ✅ reviewed (source template)
  Follow-up TODOs: None
-->

# 驭鉴 · YùJiàn Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)

Code quality is the foundation of maintainable software. All code MUST pass automated
quality gates before merge.

- Static analysis MUST run on every commit; zero warnings tolerated in CI.
- Code style MUST be enforced by automated formatters (no manual formatting debates).
- Every function/class/module MUST have a single, clear responsibility.
- Complexity (cyclomatic > 10 per function) MUST be justified or refactored.
- Dead code, commented-out blocks, and unused imports MUST be removed before merge.
- Pull requests MUST be reviewed by at least one other developer.

**Rationale**: Consistent quality gates prevent technical debt accumulation and reduce
cognitive load during reviews. Automated enforcement removes subjectivity.

### II. Testing Standards

Tests are first-class artifacts, not afterthoughts. Testing discipline MUST be
maintained at every level.

- Test-first approach REQUIRED for all new features: write tests → verify they fail
  → implement → verify they pass.
- Unit tests MUST cover all public interfaces and edge cases (minimum 80% line coverage).
- Integration tests MUST cover every API endpoint, database interaction, and external
  service boundary.
- Contract tests MUST validate all cross-service and cross-module interfaces.
- UI tests MUST cover all critical user journeys (smoke tests minimum).
- Tests MUST be independently runnable and MUST NOT depend on execution order.
- Flaky tests MUST be fixed or quarantined within 24 hours.

**Rationale**: Test-first development catches regressions early, documents expected
behavior, and enables confident refactoring. Independent tests prevent cascading failures.

### III. Experience Consistency

Consistency across the product reduces user cognitive load and development friction.

- UI components MUST follow a shared design system; ad-hoc styling is prohibited.
- API endpoints MUST follow a uniform naming convention, error format, and response
  envelope (RESTful patterns where applicable).
- Error messages MUST be actionable and consistent in tone across the entire application.
- UX patterns (navigation, form validation, loading states, empty states) MUST be
  reused from the pattern library rather than reinvented per feature.
- Naming conventions (files, variables, routes, database columns) MUST be uniform
  and documented in a single conventions guide.
- Documentation drift MUST be prevented: every behavior change MUST update
  corresponding docs in the same PR.

**Rationale**: Consistent experience reduces user errors, speeds onboarding, and
eliminates the "which pattern do I use" decision fatigue for developers.

### IV. Performance Requirements

Performance is a feature, not an optimization. Budgets MUST be defined and enforced.

- Every feature MUST define performance budgets before implementation:
  - Frontend: First Contentful Paint < 1.5s, Time to Interactive < 3s (p75 on 3G).
  - Backend: API response p95 < 200ms, p99 < 500ms.
- Performance regression tests MUST run in CI; budget violations block merge.
- Database queries MUST be profiled (EXPLAIN plan) and MUST use appropriate indexes.
- Bundle size MUST be monitored; new dependencies require size-impact justification.
- Memory leaks and resource exhaustion patterns MUST be caught in load testing
  before production deployment.
- Caching strategy MUST be documented and implemented for all read-heavy endpoints.

**Rationale**: Performance issues compound silently; budget enforcement makes
trade-offs visible and prevents death-by-a-thousand-cuts degradation.

## Security & Compliance Standards

- All user input MUST be validated and sanitized at the system boundary.
- Authentication and authorization MUST use established, audited libraries
  (never hand-rolled crypto or session logic).
- Secrets (API keys, tokens, connection strings) MUST never be committed to the
  repository; use environment variables or a secrets manager.
- Dependency vulnerabilities MUST be scanned in CI; critical/high findings block merge.
- Data access MUST follow least-privilege principle; audit logs MUST capture
  all sensitive data access.

## Development Workflow & Quality Gates

- **Branch strategy**: Feature branches from `main`; squash-merge on review approval.
- **Commit hygiene**: Commits MUST be atomic and describe the "why", not the "what".
- **CI pipeline MUST pass**: linting → type-checking → unit tests → integration tests
  → performance checks → security scan before merge is allowed.
- **Code review**: All changes MUST be reviewed; reviewer verifies constitution
  compliance explicitly.
- **Release process**: Semantic versioning (MAJOR.MINOR.PATCH); changelog updated
  with every release; breaking changes require migration guides.

## Governance

This constitution supersedes all other development practices and guidelines.
Amendments require:

1. A documented proposal explaining the change and its rationale.
2. Review and approval by the project lead.
3. Migration plan for existing code that conflicts with the amendment.
4. Version increment per semantic versioning rules:
   - MAJOR: Principle removal or redefinition.
   - MINOR: New principle or section added.
   - PATCH: Clarifications, wording, non-semantic fixes.

All pull requests MUST include a constitution compliance check. Complexity or
deviations from these principles MUST be explicitly justified in the PR description.

**Version**: 1.0.0 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-14

# USNO Sky Observer - Implementation Explanation

## Goal
Deliver a responsive Angular single-page application that consumes USNO astronomy APIs via an Express backend and persists user data with MongoDB.

## Why this structure
- Keep the Angular frontend focused on user interaction and presentation.
- Keep API integration and error normalization in Express to avoid CORS complexity and centralize backend behavior.
- Persist user-facing data (saved locations and lookup history) in MongoDB for useful repeat interactions and stronger project depth.

## Key decisions
- Angular standalone components with route-level page components (`Home`, `Moon Phases`, `Today`, `Seasons`, `About`).
- Shared reactive search component used across feature pages.
- Typed frontend models and Observable-based services for API and persistence operations.
- Express routes split by responsibility:
  - `/api/usno/*` for external API proxying
  - `/api/locations` for saved locations
  - `/api/lookups` for recent lookup history
- HTTP interceptor in Angular for centralized user-friendly API error messages.

## Data persisted
- `Location`: label, latitude, longitude, timezone, DST default.
- `Lookup`: lookup type (`phase`, `day`, `season`), label, date/year context, optional notes.

## Quality and marking focus
- Clear component tree and separation of concerns.
- REST + Observables + interfaces + MongoDB persistence.
- Responsive UI and usable form validation states.
- Deployment readiness for S3 (frontend) and EC2 (backend).

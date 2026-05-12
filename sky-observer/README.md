# Sky Observer

Sky Observer is an Angular + Express + MongoDB application for exploring USNO astronomy data:
- Moon phases by year
- One-day sun/moon data
- Seasons events by year

## Tech Stack
- Angular (standalone components + routing + SCSS)
- Express (REST proxy/API layer)
- MongoDB Atlas (saved locations + recent lookups)

## Project Structure
- `src/` - Angular frontend
- `server/src/` - Express backend
- `docs/` - report support files (implementation explanation, architecture diagram, screencast outline)

## Local Setup

### 1) Backend `.env`
Create `server/.env` with:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>
USNO_BASE_URL=https://aa.usno.navy.mil/api
USNO_STUB=true
```

### 2) Install dependencies

```bash
# frontend
npm install

# backend
cd server
npm install
```

### 3) Run backend

```bash
cd server
npm run dev
```

### 4) Run frontend

```bash
npm start
```

## Testing

```bash
# frontend tests
npm test -- --watch=false

# backend tests
cd server
npm test
```

## API Endpoints
- `GET /api/health`
- `GET /api/usno/moon/phases/year?year=2026`
- `GET /api/usno/rstt/oneday?date=YYYY-MM-DD&coords=lat,lon&tz=0&dst=false`
- `GET /api/usno/seasons?year=2026&tz=0&dst=false`
- `GET /api/locations`
- `POST /api/locations`
- `GET /api/lookups`
- `POST /api/lookups`
# SkyObserver

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Angular Project Template

Standalone Angular 19+ with zoneless change detection, signals, and OnPush.

## Quick Setup

```bash
# From project directory:
ng new frontend --standalone --style=css --routing
cd frontend

# Replace app.config.ts with app.config.template.ts content
# Replace app.routes.ts with app.routes.template.ts content
# Copy environment files to src/environments/
# Copy proxy.conf.json for API proxying

# Install transloco for i18n (if needed):
ng add @ngneat/transloco

# Start dev server with proxy:
ng serve --proxy-config proxy.conf.json
```

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/           # Services, guards, interceptors
│   │   ├── features/       # Feature modules (lazy-loaded)
│   │   ├── shared/         # Shared components, directives, pipes
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   ├── i18n/           # Translation files (en.json, es.json, etc.)
│   │   └── themes/         # theme.json for dynamic theming
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.css          # Import shared/styles/theme-variables.css
├── proxy.conf.json
├── .env.example
└── angular.json
```

## Environment Setup

```bash
cp .env.example .env
```

## Conventions

- All components: `standalone: true`, `ChangeDetectionStrategy.OnPush`
- State: `signal()`, `computed()` — no BehaviorSubject
- Inputs: `input.required<T>()` / Outputs: `output<T>()`
- Styling: CSS variables only (import shared/styles/theme-variables.css)
- Lazy load all feature routes via `loadComponent`
- Zoneless change detection via `provideExperimentalZonelessChangeDetection()`
- Secrets never in frontend code — use environment files for config only

## Template Files

| File | Purpose |
|------|---------|
| `app.config.template.ts` | Application config with zoneless CD |
| `app.routes.template.ts` | Route config with lazy loading |
| `environment.template.ts` | Dev environment config |
| `environment.prod.template.ts` | Production environment config |
| `proxy.conf.template.json` | API proxy config for dev server |
| `.env.example` | Environment variable template |

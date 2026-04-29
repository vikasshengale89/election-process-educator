# Agent Rules — election-process-educator

> Cross-IDE rules file. Works in Google Antigravity, Cursor, and Claude Code.
> Agents read this file automatically before executing tasks.

## Project Context

- **Project:** election-process-educator
- **Stack:** Angular 19 (standalone, zoneless, signals) + Node.js/Express
- **Deployment:** Firebase Hosting (Spark Plan — FREE tier only)
- **Competition:** Google Antigravity PromptWars

## Mandatory Rules

### Angular (Non-Negotiable)
- Every component MUST use `standalone: true` and `ChangeDetectionStrategy.OnPush`
- State MUST use `signal()` and `computed()` — NEVER use BehaviorSubject
- Inputs: `input.required<T>()` / Outputs: `output<T>()`
- MUST use `provideExperimentalZonelessChangeDetection()` in app.config.ts
- ALL feature routes MUST be lazy loaded via `loadComponent`
- CSS MUST use variables only — NO hardcoded colors, spacing, or fonts
- NEVER use `any` type — use `unknown` with type guards
- NEVER use `console.log` — use a logging service

### Node.js Backend
- TypeScript strict mode enabled
- Express with proper error-handling middleware
- Input validation on ALL endpoints
- CORS configured for Angular dev server (localhost:4200)
- ALL secrets via `process.env` (dotenv) — NEVER hardcode

### Firebase Spark Plan
- NO Cloud Functions (not available on Spark)
- Firebase Hosting ONLY for deployment
- For dynamic data, use Firestore directly from Angular
- Keep total build output under 10 GB

### Security
- NEVER hardcode passwords, API keys, tokens, or secrets
- ALL secrets MUST be in `.env` (gitignored)
- Only `.env.example` with placeholders may be committed
- Input validation at all API boundaries
- CORS properly configured
- XSS prevention via Angular's built-in sanitization

### Quality Gates
- Zero linter errors before completing any task
- No unused imports, variables, or dead code
- Cyclomatic complexity < 10 per function
- All files must compile without errors

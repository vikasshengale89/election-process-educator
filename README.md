# Election Process Educator

An interactive AI guide to demystifying democracy. This assistant provides clear, step-by-step navigation through election timelines, voter registration, and polling procedures. Designed to replace complex jargon with easy-to-follow, personalized paths, it ensures every citizen feels confident and informed on their journey to the ballot box.

**Submission for Google Antigravity PromptWars Hackathon**

## Features

- **Voter Registration Wizard** — Multi-step personalized questionnaire that generates a custom voting checklist based on your voter status, method, ID, and address
- **Election Timeline** — Filterable chronological track of vital election deadlines with location-based events
- **Glossary** — Searchable, categorized dictionary of 16 election terms explained in plain language
- **Knowledge Quiz** — 7-question interactive quiz with immediate feedback, explanations, and grading
- **Polling Location Finder** — Address-based search returning nearby locations, hours, accessibility features, and state-specific ID requirements
- **Social Share** — Share voter readiness status on Twitter/X, Facebook, LinkedIn, WhatsApp, or copy link
- **Election Reminders** — Mock push notification alerts for upcoming election deadlines via Web Notification API
- **Bilingual Support** — Full English/Spanish language switching across the entire UI
- **Ambient Idle Mode** — Mesh gradient animation screensaver after 60s of inactivity (Wow Factor)

## Google Services Integrated

| Service | Usage |
| :--- | :--- |
| Google OAuth 2.0 | Secure authentication via Google Sign-In |
| Google Analytics (gtag.js) | Page view tracking, feature engagement events (wizard, quiz, glossary, polling, share), Web Vitals reporting |
| Google reCAPTCHA v3 | Invisible bot protection on guest login |
| Google Fonts | Inter typeface with preconnect optimization |
| Firebase Hosting | Static SPA deployment with security headers, cache optimization (Spark free tier) |
| Performance Monitoring | Custom Web Vitals (LCP, FID, CLS, navigation timing) reported to Google Analytics |

## Tech Stack

- **Frontend:** Angular (Standalone components, Zoneless change detection, Signal-based state, OnPush strategy, ESLint)
- **Backend:** Node.js, Express, TypeScript — Helmet, CORS, Joi validation, rate limiting, structured logging
- **Deployment:** Firebase Hosting (Spark Plan — completely free tier)
- **Styling:** Custom CSS variables only — Glassmorphism UI with frosted glass, mesh gradients, smooth transitions

## Quality Metrics

- **196 unit tests** passing across 35 test files (19 frontend + 16 backend)
- **Zero linter errors** — strict TypeScript (`strict: true`, `noImplicitAny`, `strictNullChecks`), no `any` types, ESLint + angular-eslint
- **105 KB** production transfer size (loads in < 1 second on standard broadband)
- **WCAG 2.1 AA** compliant — skip links, ARIA labels/live regions, keyboard navigation, high contrast mode (`prefers-contrast`), `prefers-reduced-motion`, `prefers-color-scheme` light mode support, print stylesheet, focus management, screen reader announcements
- **Security** — Helmet headers, CORS allowlist with preflight caching, Joi input validation on all endpoints, rate limiting (API + auth), CSP/HSTS/X-Frame-Options/Referrer-Policy, express-session with httpOnly cookies, request ID tracking, structured logging, XSS protection via Angular sanitization, no hardcoded secrets (`.env` only)
- **Performance** — Web Vitals monitoring (LCP, FID, CLS), custom performance traces, lazy image loading directive, all routes lazy-loaded with `loadComponent()`, optimal cache headers (immutable for hashed assets, no-cache for HTML)
- **All routes lazy-loaded** with `loadComponent()`

## Security Architecture

| Layer | Protection |
| :--- | :--- |
| Transport | HSTS (`max-age=31536000`), `upgrade-insecure-requests` in CSP |
| Headers | Helmet.js, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` |
| CSP | Script/style/font/img/connect/frame sources explicitly whitelisted |
| Authentication | Google OAuth 2.0 with ID token verification, express-session with httpOnly/sameSite cookies |
| Bot Protection | Google reCAPTCHA v3 (invisible) on login |
| Input Validation | Joi schemas on all API endpoints (query params, body, path params) |
| Rate Limiting | 100 req/15min (API), 20 req/15min (auth) with standard headers |
| CORS | Origin allowlist, preflight caching (86400s), credentials support |
| XSS | Angular built-in sanitization, no `innerHTML`, CSP script restrictions |
| Secrets | All credentials in `.env` (gitignored), `.env.example` with placeholders only |
| Observability | Request ID on every response (`X-Request-Id`), structured JSON logging |

## Accessibility Features

| Feature | Implementation |
| :--- | :--- |
| Skip Navigation | `<a class="skip-link" href="#main-content">` visible on focus |
| ARIA Labels | All interactive elements have descriptive labels |
| Live Regions | Dynamic content announced via `aria-live="polite"` and `role="alert"` |
| Keyboard Navigation | Full tab order, focus-visible outlines, radio groups for options |
| Screen Reader | `sr-only` class, `aria-hidden` on decorative elements, `aria-describedby` |
| High Contrast | `@media (prefers-contrast: high)` adjustments |
| Reduced Motion | `@media (prefers-reduced-motion: reduce)` disables animations |
| Color Scheme | `@media (prefers-color-scheme: light)` light mode support |
| Print | `@media print` stylesheet for clean printing |
| Language | Dynamic `<html lang>` attribute, full EN/ES bilingual support |

## Local Development

1. **Install Dependencies:**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Google OAuth credentials
   ```

3. **Run Backend Server:**
   ```bash
   cd backend && npm run dev
   ```

4. **Run Frontend Application:**
   ```bash
   cd frontend && npm start
   ```
   Navigate to `http://localhost:4200/`.

5. **Run Tests:**
   ```bash
   cd frontend && npx ng test        # 147 frontend tests
   cd ../backend && npm test          # 49 backend tests
   ```

6. **Run Linter:**
   ```bash
   cd frontend && npm run lint
   ```

## Deliverables

- [x] Angular Frontend with Glassmorphism UI
- [x] Node.js Express Backend API
- [x] Unit Tests Passing (196 tests, 35 files)
- [x] Requirements Document (requirements.md)
- [x] Implementation Plan (implementation_plan.md)
- [x] Flow Document (FLOW.md)
- [x] Presentation README (README.md)
- [x] LinkedIn Post (LINKEDIN_POST.md)
- [x] Firebase Configuration (firebase.json)

## Author

Developed by Vikas for Google Antigravity PromptWars.

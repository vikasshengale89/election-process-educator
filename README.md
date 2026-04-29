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
| Google Analytics (gtag.js) | Page view tracking and custom event analytics |
| Google reCAPTCHA v3 | Invisible bot protection on login |
| Google Fonts | Inter typeface |
| Firebase Hosting | Static SPA deployment (Spark free tier) |

## Tech Stack

- **Frontend:** Angular (Standalone components, Zoneless change detection, Signal-based state, OnPush strategy, ESLint)
- **Backend:** Node.js, Express, TypeScript — Helmet, CORS, Joi validation, rate limiting, structured logging
- **Deployment:** Firebase Hosting (Spark Plan — completely free tier)
- **Styling:** Custom CSS variables only — Glassmorphism UI with frosted glass, mesh gradients, smooth transitions

## Quality Metrics

- **140+ unit tests** passing across 23 test files (frontend + backend)
- **Zero linter errors** — strict TypeScript, no `any` types
- **100 KB** production transfer size (loads in < 1 second)
- **WCAG 2.1 AA** compliant — skip links, ARIA labels, keyboard navigation, high contrast, `prefers-reduced-motion`
- **Security** — Helmet headers, CORS allowlist, Joi input validation, rate limiting, CSP/HSTS/XSS headers, XSS protection via Angular sanitization. Public client IDs (OAuth, reCAPTCHA) in environment files; server secrets in `.env` only.
- **All routes lazy-loaded** with `loadComponent()`

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
   cd frontend && npx ng test
   ```

## Deliverables

- [x] Angular Frontend with Glassmorphism UI
- [x] Node.js Express Backend API
- [x] Unit Tests Passing (140+ tests, 23 files)
- [x] Requirements Document (requirements.md)
- [x] Implementation Plan (implementation_plan.md)
- [x] Flow Document (FLOW.md)
- [x] Presentation README (README.md)
- [x] LinkedIn Post (LINKEDIN_POST.md)
- [x] Firebase Configuration (firebase.json)

## Author

Developed by Vikas for Google Antigravity PromptWars.

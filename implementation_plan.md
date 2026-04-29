# Implementation Plan — Election Process Educator

## Architecture Overview

- **Frontend:** Angular SPA with standalone components, zoneless change detection, signal-based state management, and OnPush strategy
- **Backend:** Node.js / Express REST API with TypeScript strict mode, Helmet security headers, CORS middleware, and Joi input validation
- **Deployment:** Firebase Hosting (Spark Plan — free tier, static files only)
- **Auth:** Google Identity Services (client-side OAuth) + Guest login fallback
- **Styling:** CSS custom properties only — Glassmorphism design system with frosted glass panels, mesh gradient backgrounds

## File Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/        # i18n, logging, analytics, notification
│   │   │   └── interceptors/    # HTTP error interceptor
│   │   ├── shared/components/   # Navbar
│   │   ├── features/
│   │   │   ├── home/            # Dashboard with feature cards
│   │   │   ├── wizard/          # Multi-step registration wizard
│   │   │   ├── timeline/        # Filterable election timeline
│   │   │   ├── glossary/        # Searchable term dictionary
│   │   │   ├── quiz/            # Interactive knowledge quiz
│   │   │   ├── polling/         # Polling location finder
│   │   │   └── share/           # Social media sharing
│   │   ├── login/               # Google Sign-In + Guest login
│   │   ├── login-success/       # OAuth callback handler
│   │   ├── auth.ts              # AuthService (signals, localStorage)
│   │   ├── auth.guard.ts        # Route guard
│   │   ├── app.component.ts     # Shell (navbar, idle detection, lang)
│   │   ├── app.config.ts        # Providers (zoneless, router, http)
│   │   └── app.routes.ts        # Lazy-loaded routes
│   ├── environments/            # Dev / Prod config
│   └── styles.css               # Global Glassmorphism design system
backend/
├── src/
│   ├── config/                  # env.config, google.config
│   ├── controllers/             # timeline, glossary, quiz, polling
│   ├── middleware/               # CORS, error handler, Joi validation
│   ├── routes/                  # Express route definitions
│   └── utils/                   # Structured logger
```

## Dependencies

### Frontend
- @angular/core, router, common, forms, animations, platform-browser
- rxjs, tslib
- vitest (dev — unit testing)

### Backend
- express, helmet, cors, joi, uuid, google-auth-library, dotenv
- typescript, ts-node, nodemon (dev)

## Build Order

### Phase 1 — Foundation
1. Scaffold Angular app with standalone config, zoneless detection
2. Set up Express backend with Helmet, CORS, structured logger
3. Implement environment configs and proxy for local dev
4. Create global Glassmorphism CSS design system

### Phase 2 — Authentication
5. Implement Google Identity Services client-side auth
6. Implement guest login with localStorage fallback
7. Create auth guard and route protection
8. Add reCAPTCHA v3 integration on login

### Phase 3 — Core Features
9. Build voter registration wizard (4-step, personalized checklist)
10. Build election timeline (filterable by type)
11. Build glossary (searchable, categorized, 16 terms)
12. Build knowledge quiz (7 questions, scoring, grade)

### Phase 4 — Extended Features
13. Build polling location finder (address input, state ID requirements)
14. Build social share (Twitter, Facebook, LinkedIn, WhatsApp, copy link)
15. Implement election reminder notifications (Web Notification API)
16. Implement bilingual support (English / Spanish) via I18nService

### Phase 5 — Polish & Quality
17. Add Google Analytics tracking (page views, events)
18. Add idle detection with animated screensaver (Wow Factor)
19. Write comprehensive unit tests (115+ tests, 16 files)
20. Add WCAG 2.1 AA accessibility (ARIA, keyboard, high contrast, reduced motion)

### Phase 6 — Deployment
21. Configure Firebase Hosting with security headers and CSP
22. Create static API JSON files for Spark plan hosting
23. Build production bundle and deploy to Firebase
24. Verify all functionality on live URL

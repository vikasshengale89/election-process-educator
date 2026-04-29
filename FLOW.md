# Election Process Educator - Application Flow

## Architecture Overview

The **Election Process Educator** is a full-stack web application designed to guide citizens through the complexities of the democratic process. 

### Technology Stack
- **Frontend**: Angular 19 (Standalone, Zoneless, Signals)
- **Backend**: Node.js & Express (TypeScript)
- **Deployment**: Firebase Hosting (Spark Plan)
- **Design System**: Glassmorphism UI (CSS Variables, responsive)

## Application Workflow

### 1. Initial Access & WOW Factor
- When a user visits the application, they land on the **Home Page**, greeted by a vibrant mesh-gradient background and a sleek glassmorphic interface.
- **Ambient Idle Experience**: If the user remains inactive for 30 seconds, an interactive particle animation triggers, transforming the screen into a captivating, ambient countdown timer to Election Day. Moving the mouse or tapping the screen dismisses the overlay instantly.

### 2. Authentication Flow
- Users can "Login as Guest" using a mock OAuth flow handled by the `AuthService`.
- Angular's `authGuard` protects feature routes. If a user attempts to access `/wizard` or `/timeline` directly, they are seamlessly redirected to the Login page.
- The authentication state is reactively managed using Angular Signals, removing the need for RxJS `BehaviorSubject` abstractions and aligning with modern Angular 19 practices.

### 3. Core Features & Learning Paths
Once authenticated, users can navigate between four main educational modules using the sticky navigation bar:

#### A. Voter Wizard (`/wizard`)
- A multi-step interactive questionnaire built to assess a user's readiness to vote.
- Captures details such as voter status (first-time vs. returning), intended voting method, and ID availability.
- **Output**: Generates a personalized, step-by-step checklist outlining exact tasks the user needs to complete (e.g., "Request mail-in ballot," "Update address").

#### B. Election Timeline (`/timeline`)
- A chronologically ordered, filterable list of critical dates in the election cycle.
- Users can filter by "Registration," "Voting," "Deadline," or "Results" to find exactly what they need.
- Visual cues (colors and emojis) help categorize each milestone.

#### C. Glossary (`/glossary`)
- A searchable, filterable dictionary of complex election terminology translated into plain, accessible language.
- Includes concepts like *Electoral College*, *Provisional Ballot*, and *Gerrymandering*.

#### D. Knowledge Quiz (`/quiz`)
- A 7-question interactive quiz to test the user's comprehension of the electoral process.
- Features immediate feedback on answers, detailed explanations for correct/incorrect choices, and a final grade screen (e.g., "Democracy Champion! 🏆").

## Data Flow (Client-Server)
1. **Frontend Request**: Angular components (via `HttpClient`) request data from the backend API endpoints (e.g., `/api/v1/timeline`).
2. **Backend Proxy**: During local development, the Angular CLI proxies requests to `localhost:3000`. In production, Firebase Hosting rewrites route traffic as necessary.
3. **Express Controllers**: The backend receives the request, validates it, and returns the appropriate JSON response.
4. **State Update**: Angular Signals react to the returned data, instantly updating the UI without triggering global change detection cycles (thanks to Zoneless integration).

## Accessibility (WCAG 2.1 AA)
Every component is built with semantics and accessibility in mind:
- Proper `aria-labels` and `aria-live` regions.
- Semantic HTML (`<article>`, `<nav>`, `<button>`).
- Keyboard navigability with visible focus indicators.
- High contrast text on glassmorphic backgrounds.

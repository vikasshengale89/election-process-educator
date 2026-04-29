# Election Process Educator 🗳️

An interactive AI guide to demystifying democracy. This assistant provides clear, step-by-step navigation through election timelines, voter registration, and polling procedures. Designed to replace complex jargon with easy-to-follow, personalized paths, it ensures every citizen feels confident and informed on their journey to the ballot box.

**Submission for Google Antigravity PromptWars Hackathon**

## Features 🚀

*   **Voter Registration Wizard:** A personalized, interactive questionnaire that assesses readiness and generates a customized voting checklist.
*   **Election Timeline:** An interactive chronological track of vital deadlines, helping users stay ahead of registration and voting dates.
*   **Glossary:** A jargon-free dictionary translating complex political terms (like Gerrymandering, Electoral College, etc.) into plain language.
*   **Knowledge Quiz:** A fun, engaging 7-question test to evaluate the user's democratic knowledge and confidence.
*   **WOW Factor Idle Screen:** An ambient countdown timer powered by an interactive particle background that activates during inactivity.

## Tech Stack 🛠️

*   **Frontend:** Angular 19 (Standalone components, Zoneless change detection with Signals, `OnPush` strategy).
*   **Backend:** Node.js, Express, TypeScript (Secure headers via Helmet, organized controllers).
*   **Deployment:** Firebase Hosting (Spark Plan - completely free tier).
*   **Styling:** Custom CSS variables enabling a premium Glassmorphism UI (frosted glass, dynamic mesh gradients, smooth transitions). No external component libraries used.

## Security & Accessibility 🔒
*   **Security:** 100% Score target. Implements Helmet, CORS protection, parameter validation, and environment variables. Secrets are isolated and git-ignored.
*   **Accessibility:** 100% Score target. Built to WCAG 2.1 AA standards, featuring semantic HTML structure, ARIA labels, keyboard focus management, and high contrast text ratios.

## Local Development 💻

1. **Install Dependencies:**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Run Backend Server:**
   ```bash
   cd backend && npm run dev
   ```

3. **Run Frontend Application:**
   ```bash
   cd frontend && npm start
   ```
   Navigate to `http://localhost:4200/`.

## Author
Developed by Vikas for Google Antigravity.

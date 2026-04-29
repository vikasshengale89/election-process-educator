# AUTO-EXECUTE: Build election-process-educator End-to-End

> **Paste this ENTIRE prompt into your AI Agent IDE (Antigravity / Cursor).**
> The agent will execute every step from folder structure to deployment.

---

## CHALLENGE DESCRIPTION

Election Process Education > 
Create an assistant that helps users understand the election process, timelines, and steps in an interactive and easy-to-follow way.
An interactive AI guide to demystifying democracy. This assistant provides clear, step-by-step navigation through election timelines, voter registration, and polling procedures. Designed to replace complex jargon with easy-to-follow, personalized paths, it ensures every citizen feels confident and informed on their journey to the ballot box.
---

## INSTRUCTIONS FOR AI AGENT
Implement maximum google services as possible, it should give 100% security score, 100% score quality, 100% efficiency, 100% testing, 100% in accessibility, 100% in problem statement alignment. 100% in google services.

You are building **election-process-educator** for the Google Antigravity PromptWars hackathon.
The project is already initialized at `projects/election-process-educator/`.
Read `projects/election-process-educator/AGENTS.md` for all mandatory coding rules.

Execute ALL the following steps IN ORDER. Do NOT skip any step.
Do NOT ask for confirmation between steps — execute continuously until done.
If a step fails, fix the issue and retry before moving to the next step.

---

### STEP 1: CREATE FOLDER STRUCTURE

Create the folder structure at `projects/election-process-educator/`.

**Frontend:** Angular 19+ standalone app at `projects/election-process-educator/frontend/`

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   ├── features/          # One folder per feature — lazy loaded
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   └── pipes/
│   │   ├── models/
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── assets/
│   │   ├── i18n/
│   │   ├── icons/
│   │   └── images/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.css
└── proxy.conf.json
```

**Backend:** Node.js + Express at `projects/election-process-educator/backend/`

```
backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── index.ts
├── tests/
├── .env.example
├── tsconfig.json
└── nodemon.json
```

Create `.gitkeep` in empty folders. Create real files for: `proxy.conf.json`,
`.env.example`, `environment.ts`, `environment.prod.ts`.

Then run:
- `cd projects/election-process-educator/frontend && ng new election-process-educator --standalone --style=css --routing --skip-git` (if not already created)
- `cd projects/election-process-educator/backend && npm init -y`

---

### STEP 2: GENERATE REQUIREMENTS & IMPLEMENTATION PLAN

Read these files first:
1. `templates/requirements_template.md`
2. `templates/implementation_plan_template.md`
3. `.context/conventions.md`
4. `projects/election-process-educator/AGENTS.md`

**Generate `projects/election-process-educator/requirements.md`** — Fill ALL sections:
- Full challenge description (from the CHALLENGE DESCRIPTION above)
- At least 10 specific, testable functional requirements
- Non-functional: performance (<2s load), security (XSS, CORS, validation),
  accessibility (WCAG 2.1 AA), responsive design (mobile-first)
- Tech stack: Angular 19 + Node.js/Express + Firebase Hosting (Spark Plan)
- Deliverables checklist, Judging criteria table
- NO placeholders, NO _TBD_, NO _..._

**Generate `projects/election-process-educator/implementation_plan.md`** — Fill ALL sections:
- Overview, Architecture (ASCII diagram), Data Model (entities + fields + types)
- API Endpoints table (Method, Path /api/v1/..., Purpose, Auth)
- Files to Create (every file, grouped by frontend/backend)
- Dependencies (every npm package with purpose)
- Build Order: Phase 1 (MVP), Phase 2 (Features), Phase 3 (Polish)
- Security checklist, Testing strategy, Time allocation
- NO placeholders anywhere

**WOW FACTOR — Add Phase 4:**
Add ONE impressive feature that makes judges remember this project. Pick the
most visually impactful and fastest to implement from:
- Real-time ambient idle mode with CSS particle animations + event countdown
- Voice-activated navigation via Web Speech API
- Time-of-day adaptive theming with weather-aware backgrounds
Include specific implementation steps in the plan.

---

# Implement Glassmorphism ui
Redesign the current UI using a modern Glassmorphism theme. Use a mesh gradient background with colors #0F172A and #1E293B. All main containers should have a frosted glass effect with a 12px blur, a 1px border with 20% opacity white, and rounded corners (1rem). Ensure high contrast for all text to maintain accessibility.

# Accessibility (A11y) 
Scan the UI components. Ensure all images have alt tags, buttons have aria-labels, and the color contrast of our Glassmorphism theme meets WCAG AA standards.

# Efficiency & Performance 
Analyze the code for redundant API calls, large bundle sizes, or slow logic. Suggest 3 optimizations to make the app faster (e.g., implementing caching or lazy loading).

#Problem Statement Alignment 
Compare the current implementation against our problem_statement.md. Are we solving the core issue, or have we added unnecessary 'feature creep'?



### STEP 3: EXECUTE PHASE 1 (MVP)

Read `projects/election-process-educator/implementation_plan.md` and `projects/election-process-educator/AGENTS.md`.
Execute Phase 1 following ALL rules from AGENTS.md.

Install all dependencies. Build each file. Fix linter issues after each file.

---

### STEP 4: EXECUTE PHASE 2 (FEATURES)

Read `projects/election-process-educator/implementation_plan.md` and execute Phase 2.
Same rules. Complete ALL listed steps.

---

### STEP 5: EXECUTE PHASE 3 (POLISH) + WOW FACTOR

Execute Phase 3 + Phase 4 (Wow Factor) from `implementation_plan.md`.

After all phases, run quality check:
- Zero linter errors
- No hardcoded secrets
- All components standalone + OnPush
- All routes lazy loaded
- No console.log
- No unused imports

---

### STEP 6: RUN TESTS & FIX ALL ISSUES

Execute:
```bash
cd projects/election-process-educator/backend && npm test
cd projects/election-process-educator/frontend && ng test --watch=false
cd projects/election-process-educator/frontend && ng build --configuration=production
cd projects/election-process-educator/backend && npm run build
```

Test each API endpoint with curl. Fix every failure immediately and re-test.

Security audit:
- Search all files for hardcoded passwords, secrets, keys, tokens
- Verify .env is gitignored
- Verify CORS and input validation

Do NOT proceed until ALL tests pass and build succeeds.

---

### STEP 7: GENERATE FLOW DOCUMENT

Read all source files in `projects/election-process-educator/` and generate
`projects/election-process-educator/FLOW.md` with:
- High-level architecture diagram (ASCII)
- Application startup flow (bootstrap sequence)
- User interaction flows per feature (action → component → service → API → UI update)
- Data flow and state management (Angular signals)
- Route map table (path, component, lazy loaded, guard)
- API contract table (method, path, request, response)
- Security flow (auth, validation, CORS, XSS prevention)
- Build & deploy flow (ng build → firebase deploy)

---

### STEP 8: CONFIGURE FIREBASE HOSTING

Create `projects/election-process-educator/firebase.json`:
```json
{
  "hosting": {
    "public": "frontend/dist/election-process-educator/browser",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/api/**", "destination": "/api/index.html" },
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css|svg|png|jpg|jpeg|gif|ico|webp)",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      },
      {
        "source": "**",
        "headers": [
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "X-XSS-Protection", "value": "1; mode=block" }
        ]
      }
    ]
  }
}
```

Create `projects/election-process-educator/.firebaserc`:
```json
{
  "projects": { "default": "election-process-educator" }
}
```

Print these commands for the user to deploy manually:
```
Firebase is configured. Run these commands to deploy:
  cd projects/election-process-educator
  firebase login
  firebase init hosting   # Select existing project or create new
  cd frontend && ng build --configuration=production && cd ..
  firebase deploy --only hosting
```

---

### STEP 9: PREPARE GIT & GITHUB (with SSH Deploy Key)

A deploy key has already been generated at `projects/election-process-educator/.deploy_key`.

Initialize git and prepare for push:
```bash
cd projects/election-process-educator
git init
git branch -M main
git add .
git commit -m "feat: election-process-educator — Angular + Node.js hackathon app for PromptWars"
```

Verify .gitignore covers: node_modules, dist, .angular, .env, .firebase,
.cursor, .context, *.template.*, coverage, .idea, .vscode, *.log,
.deploy_key, .deploy_key.pub

Then print these instructions for the user:

```
GitHub Push Instructions (using SSH deploy key):

1. Create a NEW repository on GitHub:
   - Go to https://github.com/new
   - Name: election-process-educator
   - Visibility: Public
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

2. Add the deploy key to the repo:
   - Go to: https://github.com/vikasshengale89/election-process-educator/settings/keys
   - Click "Add deploy key"
   - Title: "Hackathon Deploy Key"
   - Paste this public key:

ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG5aru4NUQoH9DpUrS8GS9v7k+VL0AYrdYrMEdB21Est deploy@election-process-educator

   - CHECK "Allow write access"
   - Click "Add key"

3. Push the code:
   cd projects/election-process-educator
   eval "$(ssh-agent -s)"
   ssh-add .deploy_key
   git remote add origin git@github.com:vikasshengale89/election-process-educator.git
   git push -u origin main
```

---

### STEP 10: GENERATE PRESENTATION README

Generate a competition-ready `projects/election-process-educator/README.md` with:
- Project tagline (one compelling sentence)
- Demo section (live URL placeholder, screenshot placeholders)
- Problem statement (3-4 sentences, why this matters)
- Feature list (all features, highlight Wow Factor with special callout)
- Tech stack table (Layer | Technology | Why)
- Architecture diagram (ASCII from implementation plan)
- Quick start (clone → install → run — step by step commands)
- Project structure tree with descriptions
- API documentation table
- Security measures list
- Performance optimizations list
- Accessibility compliance (WCAG 2.1 AA, keyboard nav)
- Deployment instructions (Firebase Hosting)
- Future roadmap (3-4 enhancement ideas)
- Markdown badges: Angular, Node.js, Firebase, TypeScript
- Author line: Built for Google Antigravity PromptWars Competition

---

### STEP 11: GENERATE LINKEDIN POST

Generate `projects/election-process-educator/LINKEDIN_POST.md` with:

**LinkedIn post (1200-1500 chars):**
- Hook (first 2 lines must grab attention — "Just shipped..." or compelling question)
- The challenge: mention Google Antigravity PromptWars by name
- What I built: election-process-educator in 2-3 sentences + the Wow Factor
- Tech: Angular 19 + Node.js + Firebase (one line)
- Key learning about AI-assisted development
- CTA: GitHub link + live demo link
- Hashtags: #PromptWars #GoogleAntigravity #Angular #Firebase
  #AIAssistedDevelopment #Hackathon #WebDevelopment

**Twitter/X post (280 chars):** Shorter version.

Tone: professional, authentic. Emphasize YOUR skills + AI as productivity multiplier.
Do NOT make it sound like AI wrote everything.

---

## END OF MEGA-PROMPT

When ALL steps are done, print this summary:

```
╔═══════════════════════════════════════════════════════════════════╗
║                election-process-educator — BUILD COMPLETE                     ║
╠═══════════════════════════════════════════════════════════════════╣
║  Requirements:    projects/election-process-educator/requirements.md          ║
║  Plan:            projects/election-process-educator/implementation_plan.md   ║
║  Flow:            projects/election-process-educator/FLOW.md                  ║
║  README:          projects/election-process-educator/README.md                ║
║  LinkedIn:        projects/election-process-educator/LINKEDIN_POST.md         ║
║  Firebase:        projects/election-process-educator/firebase.json            ║
║  AGENTS.md:       projects/election-process-educator/AGENTS.md                ║
╠═══════════════════════════════════════════════════════════════════╣
║  MANUAL STEPS REMAINING:                                          ║
║  1. Add deploy key to GitHub repo (see Step 9 output)             ║
║  2. git push -u origin main                                       ║
║  3. firebase login && firebase deploy --only hosting              ║
║  4. Copy LinkedIn post from LINKEDIN_POST.md                      ║
╚═══════════════════════════════════════════════════════════════════╝
```

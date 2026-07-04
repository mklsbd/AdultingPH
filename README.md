# AdultingPH

A mobile-responsive Next.js 14 + TypeScript + Tailwind CSS dashboard that helps first-time job seekers in the Philippines track and complete their mandatory pre-employment documents: **SSS, NBI Clearance, PhilHealth, Pag-IBIG (HDMF), and BIR (TIN)**.

> This is an independent tracker and resource tool. AdultingPH is not affiliated with any Philippine government agency.

## Features

- **Dashboard** — checklist + progress bar across all five agencies, with a "Share progress" button
- **Agency Directory** — verified official links, step-by-step guides, requirements list, and a "find office near me" map link generated from your city
- **Document Vault** — drag-and-drop uploader that converts PDFs/images to Base64 and stores them only in the browser's `localStorage` (nothing is uploaded to a server)
- **Resource Center** — plain-language explainer of Republic Act 11261 (First Time Jobseekers Assistance Act)
- **Gmail sign-in** — Google OAuth via NextAuth.js
- **Location onboarding** — asks for the user's region/province/city right after signup (with an optional one-tap auto-detect using the browser's geolocation + OpenStreetMap reverse geocoding) so the Directory can point them to nearby offices
- **AI assistant** — floating chat widget backed by the Claude API (falls back to a built-in rule-based guide if no API key is configured)
- Glassmorphism UI: navy/white palette, frosted-glass cards, success green / warning amber status indicators

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Visit `http://localhost:3000`.

## 2. Environment variables

Fill these into `.env.local` (and later into your Vercel project settings):

| Variable | Required? | Purpose |
|---|---|---|
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Yes, for Gmail sign-in | From [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials). Create an **OAuth 2.0 Client ID** (type: Web application). Add `https://YOUR-DOMAIN/api/auth/callback/google` as an authorized redirect URI (and `http://localhost:3000/api/auth/callback/google` for local dev). |
| `NEXTAUTH_SECRET` | Yes | Any random string. Generate one with `openssl rand -base64 32`. |
| `NEXTAUTH_URL` | Yes in production | Your deployed URL, e.g. `https://adultingph.vercel.app`. |
| `ANTHROPIC_API_KEY` | Optional | Powers the live AI assistant using Claude. Get one at [console.anthropic.com](https://console.anthropic.com/). Without it, the assistant still works using a built-in rule-based FAQ. |

Without the Google credentials, the "Continue with Gmail" button will still render but sign-in will fail — the app is fully wired for OAuth, it just needs your own Google Cloud project.

## 3. Deploy to Vercel

**Option A — Vercel dashboard (no terminal needed)**
1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. In the "Environment Variables" step, add the four variables from the table above.
4. Click **Deploy**.
5. Once deployed, copy your Vercel URL and add it as an authorized redirect URI in Google Cloud Console: `https://YOUR-VERCEL-URL/api/auth/callback/google`.
6. Update `NEXTAUTH_URL` in your Vercel project settings to match your final domain, then redeploy.

**Option B — Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel            # first deploy, follow the prompts
vercel env add GOOGLE_CLIENT_ID
vercel env add GOOGLE_CLIENT_SECRET
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
vercel env add ANTHROPIC_API_KEY   # optional
vercel --prod
```

## Project structure

```
app/
  page.tsx                 Landing page
  login/, register/        Auth pages (Gmail sign-in)
  onboarding/location/      Post-signup location step
  dashboard/                Checklist + progress dashboard
  directory/                Agency directory with guides & map links
  vault/                    Document vault (localStorage)
  resources/                RA 11261 explainer
  api/auth/[...nextauth]/   NextAuth route (Google provider)
  api/chat/                 AI assistant route (Claude + fallback)
components/                 Shared UI (AppShell, cards, chat widget, etc.)
data/                       Agency info + verified URLs, PH regions/provinces
lib/                        Types, localStorage helpers, NextAuth config
```

## Data & privacy notes

- Vault documents, checklist progress, and location are stored in the browser's `localStorage` only — they are never sent to a server.
- All official government links open in a new tab with `rel="noopener noreferrer"`.
- Government portal URLs (SSS, NBI, PhilHealth, Pag-IBIG, BIR) were verified against each agency's official domain at the time of writing. Agencies occasionally change their portals — always confirm you're on the correct `.gov.ph` domain before entering personal information.

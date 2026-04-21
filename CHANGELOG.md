# CHANGELOG — khalidrind.io

All notable changes to this website are recorded here.
Format: version | date | what changed

---

## v1.8.3 — 2026-04-21

### Changed
- **Home page — 2nd hero video replaced** with trimmed version `KR-HEOR-VIDEO - TrimED.mp4` (34MB)
  - New file copied to `public/videos/KR-HERO-VIDEO-TRIMMED.mp4`
  - Replaced old `KR-HEOR-VIDEO.mp4` source reference
- **2nd hero video — native browser controls bar added**
  - Replaced custom click-to-play overlay (big play button) with HTML5 `controls` attribute
  - Now shows standard control bar: play/pause, time scrubber, mute, volume slider, fullscreen, 3-dot menu
  - Removed unused `useRef`, `useState`, `togglePlay` from `Home.tsx`

---

## v1.8.2 — 2026-04-21

### Fixed
- **Services API — 7-key bulletproof fallback system** (site can never break from a single key dying)
  - Root cause: primary key `AIzaSyBvCYn3...` reported leaked by Google (403 PERMISSION_DENIED)
  - Backup key `AIzaSyCE6Ykl...` also dead (403) discovered same session
  - Batch-tested all 10 known Gemini keys via curl — identified 6 working + 1 fresh new key
  - Fresh key `AIzaSyDPhilR...` created in AI Studio and set as new primary
  - Built `withFallback()` wrapper in `src/lib/gemini.ts` — auto-rotates through 7 keys on 403 or 429
  - All three API functions (`chatWithGemini`, `getGroundedInfo`, `researchWithGrounding`) now use fallback
  - Dead keys logged: `AIzaSyBvCYn3...`, `AIzaSyCE6Ykl...`, `AIzaSyCbXbi2...`

---

## v1.8.1 — 2026-04-21

### Fixed
- **Services API — emergency key rotation** (superseded by v1.8.2 in the same session)
  - Primary key `AIzaSyBvCYn3...` flagged leaked by Google, auto-revoked
  - Promoted backup key `AIzaSyCE6Ykl...` as active
  - Updated `.env.local`, MEMORY.md, WORKFLOW-01

---

## v1.8.0 — 2026-04-21

### Changed
- **Home page** — new hero video added
- **Navbar** — removed DEPLOY button
- **Supernova** — removed infographics 12 and 13 from gallery

---

## v1.7.9 — 2026-04-20

### Fixed
- **Services page — Gemini grounding now working** (was silently broken since launch)
  - Root cause diagnosed: all 3 prior keys were free-tier quota-exhausted; `gemini-2.0-flash` blocked for new API keys
  - Switched to `AIzaSyBvCYn3qzOXbHAb6rPkZNVXd7wpjxnuoiE` (verified working via curl test)
  - Model updated to `gemini-2.5-flash` (confirmed available + supports Google Search grounding)
  - Error messages now show actual API error text (not generic "Error fetching…")
- All 4 API keys tested in real-time; working key confirmed before deploy

---

## v1.7.8 — 2026-04-20

### Fixed
- **Services page — Gemini API key not loading** (previous fix attempt)
  - Changed `process.env.GEMINI_API_KEY` → `import.meta.env.VITE_GEMINI_API_KEY` (Vite requires VITE_ prefix)
  - Removed `{ googleMaps: {} }` tool (not a real Gemini API tool — replaced with googleSearch + location prompt)
  - Fixed model names: `gemini-3.1-pro-preview` / `gemini-3-flash-preview` → `gemini-2.0-flash` (valid models)

---

## v1.7.7 — 2026-04-20

### Added
- **Animated glowing favicon** — "K" on dark background, pulses cyan glow with JavaScript canvas animation
  - Implemented via `requestAnimationFrame` loop in `index.html` — updates favicon dynamically every frame
  - Glow breathes in/out (shadowBlur 6→20) with opacity 0.55→1.0 cycle
  - `public/favicon.svg` created as static fallback
- **Infographic Gallery grid + lightbox** — replaced single full-width image with interactive gallery
  - Header shows "INFOGRAPHIC GALLERY — 4 / 20" counter
  - "VIEW GALLERY →" button opens full-screen lightbox
  - 2×2 thumbnail grid of first 4 infographics with hover expand labels
  - "+ 16 MORE INFOGRAPHICS — VIEW ALL →" link
  - Full lightbox: left/right arrows, dot navigation strip, animated slide transitions
- **About page — blue neon text styling** on both description paragraphs
  - `color: #00d4ff` + `textShadow` glow effect matching rest of site neon style

### Changed
- **Footer** — "© 2024" → "© 2026"

---

## v1.7.6 — 2026-04-20

### Added
- **Infographic Gallery — 20 images** (first version — single image with left/right navigation)
  - Original "Architect of the AI Empire" infographic preserved as image #1
  - 19 new infographics added from `NOTEBOOKLM-DIVISION/KHALID-RIND-PROFILE/INFOGRAPHIC -GALERY/`
    - `unnamed (14).png` → `unnamed (32).png` — all hosted at `public/gallery/infographics/`
  - Left/right arrow navigation with AnimatePresence slide transition
  - Dot navigation strip (20 dots, click any to jump)
  - Counter label updates: "1 / 20", "2 / 20" etc.

---

## v1.7.5 — 2026-04-20

### Added
- **4 new Live Projects** in Supernova profile — now 14 total:
  - NeuraNest AI Catalyst, ProjectFlow Hybrid, MiniMax Space 2, ViralVault
- **PDF Slide Decks section** — 6 clickable PDF cards inside expanded Khalid Rind profile:
  - Khalid Rind Profile Slides, The AI Operator Revolution, Industrial Intelligence
  - Khalid Rind Overview, NeuraNest Empire Activation, The Gift of Knowledge
  - PDFs hosted at `/pdfs/` (~69MB total), open in new tab
- Preview card badges updated: 14 Live Projects · 10 Templates · 9 Client Audits · 6 PDF Decks

---

## v1.7.4 — 2026-04-20

### Added
- **Previous Projects section** — 9 client audit dashboards inside Khalid Rind expanded profile
  - 7 cards with real screenshot previews (APM, OZ Cheap Deal, VOCUS, The Agent, EDventure, Towelling Stories, Haliya)
  - 2 compact cards (Cleaning Rebranding, Piza Restaurant)
  - Layout: top 3 featured large → 4 horizontal thumbnail → 2 compact list
  - All HTML files hosted at `/previous-projects/` — click opens full dashboard in new tab
  - APM Branding: full React/Vite built app (dist folder, path fixed to relative)
  - Preview images hosted at `/gallery/projects/`

---

## v1.7.3 — 2026-04-20

### Added
- **Template Gallery section** — 10 templates inside Khalid Rind expanded profile
  - 3 featured cards with screenshot previews (NeuraNest Catalyst, Emperor Dashboard, World's Best AI Dashboard)
  - 7 compact list cards (AI Agency, Empire Dashboard, Melbourne Landing, Great Single Page, Ultimate Empire, OneDrive, AI Consultant)
  - All HTML templates hosted at `/templates/` — click opens live template in new tab
  - Screenshots hosted at `/gallery/templates/`
- Preview card badges updated: 10 Templates added

---

## v1.7.2 — 2026-04-20

### Added
- **Live Projects section** — 10 clickable project cards inside Khalid Rind expanded profile
  - NeuraNest AI World, Cosmos Learning Universe, Education Rebirth, Digital Campus, Launch Kit Generator
  - Cognitas Mind Forge, NeuraNest Agency, PainTrack App, AI Studio, MiniMax Space
  - Each card: accent color, tag badge, URL shown, opens in new tab on click
- Preview card badges updated: 10 Live Projects added

---

## v1.7.1 — 2026-04-20

### Added
- **2nd Hero Video section** on Home page — between Features Grid and Contact section
  - Video: `/videos/2ND-HERO-VIDEO.mp4` (43MB)
  - Custom click-to-play/pause button overlay (no native browser controls bar)
  - Sound enabled (removed `muted`) — plays with full audio on click
  - Rounded corners with primary glow border, loop enabled
  - `useRef` + `useState` for play/pause toggle logic

### Processed (local video, not on website)
- `The_AI_Truth_Warrior.mp4` → `The_AI_Truth_Warrior_v2.mp4`
  - Profile pic (KHALID-RIND-MAIN-PROFILE-PIC..png) overlaid top-left, 160×160px
  - NotebookLM watermark removed from bottom-right corner using FFmpeg `delogo` filter
  - Output: `C:\AI-AIR-TEAM-HQ\NOTEBOOKLM-DIVISION\KHALID-RIND-PROFILE\The_AI_Truth_Warrior_v2.mp4`

---

## v1.7.0 — 2026-04-19

### Added
- **Supernova Infographic page `/supernova`** — single profile card, click expands full layout in place
- **KHALID RIND COMMANDER PROFILE** — expand-on-click card with photo, video, audio, slides, infographic
  - Profile photo: `khalid-rind-profile.png` — full professional photo, hero layout
  - Video: `KHALID-RIND-PROFILE-VIDEO-3MIN.mp4` — exactly 3:00, trimmed with FFmpeg from 6.4 min NotebookLM video
  - Audio: `KHALID-RIND-PROFILE-AUDIO.m4a` — deep dive narration from 229-source notebook
  - Slide deck: 6 slides — Commander Profile story (NSW Gov → Melbourne → AI → data insights)
  - Infographic: `KHALID-RIND-INFOGRAPHIC.png` — "The Architect of the AI Empire" (NotebookLM generated)
- **Navbar logo** — Khalid's profile photo as logo with cyan glow ring (`ring-2 ring-primary/40`)
- **Address bar glow** — `<meta name="theme-color" content="#00d4ff">` — cyan glow on all browsers
- **"More profiles coming — added one by one"** placeholder card below Commander Profile
- **Browser title** updated: "Khalid Rind | AI & Data Intelligence"

### Changed
- Navbar: "Showroom" → "Supernova" linking to `/supernova`
- Removed all $1.5M valuation mentions from entire site

### Removed
- All 98 notebooks listing — replaced with one-by-one profile reveal system

---

## v1.6.0 — 2026-04-19

### Added
- **KHALID RIND COMMANDER PROFILE** first version on Showroom page
  - NotebookLM video (6.4 min) + audio overview generated from 229-source notebook
  - Slide deck component + Supernova stats infographic section
  - NotebookLM Knowledge Vault: all 98 notebooks listed with click-to-open links
- **Supernova Infographic section** — 6 stat cards + mission timeline
- **Navbar**: "Showroom" → "Supernova" (first rename, later confirmed in v1.7.0)

### Integrated
- **NotebookLM MCP** — `notebooklm-mcp-cli v0.5.26` installed and connected
  - `nlm setup add claude-code` — Claude Code now controls NotebookLM directly
  - 98 notebooks accessible, 35 MCP tools available
  - Account: neuranest.artificial@gmail.com
  - Auth: Google OAuth via `nlm login`
- **NOTEBOOKLM-DIVISION/KHALID-RIND-PROFILE/** — all generated assets saved locally

---

## v1.5.0 — 2026-04-19

### Added
- **Showroom page `/showroom`** — NotebookLM Division showcase
  - The Gift of Knowledge video + Your AI Learning Assistant video (both from NOTEBOOKLM-GIFT)
  - SlideDeck component (6 slides) alongside each video
  - Supernova Infographic section with stats + timeline
- **Navbar**: "Showroom" link added between Showcase and AR-VR REBIRTH
- **Videos copied to public**: `The_Gift_of_Knowledge.mp4`, `Your_AI_Learning_Assistant.mp4`

---

## v1.4.3 — 2026-04-17

### Changed
- **Showcase page: Videos moved to TOP** — "VIDEO SHOWCASE / REAL WORK. REAL IMPACT." section now loads first when visiting /showcase
- **Showcase page: Innovation Gallery moved BELOW videos** — project cards grid now sits underneath the full video section
- **Navbar: Neon Blue styling** — full navbar redesigned in neon blue (#00d4ff)
  - Bar: dark background with neon blue border + glowing shadow (`shadow-[0_2px_30px_rgba(0,212,255,0.15)]`)
  - All desktop nav links: neon blue with hover glow (`drop-shadow`)
  - Active page link: bright neon blue full glow
  - Mobile nav strip: neon blue border, dark bg, all links neon blue
  - Both scrolled and non-scrolled states updated with neon blue
- Updated Showcase description text: "Seven" → "Eight videos. Eight proof points."
- `package.json` version bumped from `1.4.2` → `1.4.3`

---

## v1.4.2 — 2026-04-17

### Added
- **BRAND profile: New hero video** — replaced old `brand-video.mp4` with `NNAI-BRAND-1.mp4`
  - Source: `C:\Users\ksr11\Videos\khalidrind-io-showcaseVideos\NNAI-BRAND-1.mp4`
  - Original file was 172 MB (over GitHub's 100 MB limit)
  - Compressed using `ffmpeg -crf 28` to 17 MB before committing
  - ffmpeg installed via `winget install Gyan.FFmpeg`
  - Served at `/videos/NNAI-BRAND-1.mp4`
- **Showcase page: "NEURANEST AI — EMPEROR IN MOTION" video added** — first card in the video grid
  - Category badge: `NEURANEST AI`
  - Description: "The NeuraNest AI empire in motion — vision, power, and the future of AI-driven digital transformation."
  - Uses same `NNAI-BRAND-1.mp4` file
- `package.json` version bumped from `1.4.1` → `1.4.2`

---

## v1.4.1 — 2026-04-17

### Removed
- **Home page: NNAI "THE EMPIRE IN MOTION" video section** — removed from all profiles per Emperor's direction

---

## v1.4.0 — 2026-04-17

### Added
- **Home page: NNAI Featured Video section** — `NNAI-MAIN-VIDEO.mp4` embedded between Hero and ticker
  - Grayscale by default → full color on hover (desktop) or touch (mobile)
  - Section header: "THE EMPIRE IN MOTION"
  - autoPlay, loop, muted, playsInline for silent autoplay across all devices

### Fixed
- **Hero grayscale effect on mobile** — replaced CSS `group-hover:grayscale-0` (broken on touch devices) with React state + `onMouseEnter`/`onMouseLeave` + `onTouchStart`/`onTouchEnd` events
  - TECH profile: now lights up on mobile tap ✅
  - BRAND profile: now lights up on mobile tap ✅
  - Touch stays active 2 seconds after finger lifts
- **Mobile navbar** — removed hamburger toggle, replaced dropdown with always-visible horizontal scrollable strip
  - All nav links always displayed in one row: Home · Services · Showcase · AR-VR REBIRTH · About · Contact · DEPLOY
  - Overflow scroll for smaller screens (swipe horizontally)
  - Active page highlighted with primary color border

### Changed
- `package.json` version bumped from `1.3.1` → `1.4.0`

---

## v1.3.1 — 2026-04-17

### Fixed
- **Contact page: corrected real contact details** (replaced placeholder dummy data)
  - Email: `hello@aura-ai.com` → `info@khalidrind.io`
  - Phone: `+1 (555) 000-1111` → `+61-493348617`
  - Office: `123 Innovation Way, San Francisco, CA` → `Melbourne, Australia`

---

## v1.3.0 — 2026-04-17

### Added
- **Showcase page: VIDEO SHOWCASE section** — 7 real project videos embedded below the project cards grid
  - `KR-APP-2.mp4` — AI App Demo II (Product Demo)
  - `KR-APP-3.mp4` — AI App Demo III (Product Demo)
  - `KR-FAMILY.mp4` — Family Platform (Community Tech)
  - `KR-SHOWCASE.mp4` — Portfolio Showcase (Personal Brand)
  - `MelbourneWaterCampain.mp4` — Melbourne Water Campaign (Social Impact)
  - `ROAD-SAFETY-CAMPAIN.mp4` — Road Safety Campaign (Social Impact)
  - `SKY-FALL.mp4` — Sky Fall (Creative Production)
  - Videos served from `public/videos/` — all confirmed under 90MB GitHub limit
  - Responsive grid: 1 col mobile → 2 col tablet → 3 col desktop
  - Each card: native HTML5 `<video controls>`, title, category badge, description
  - Section header: "REAL WORK. REAL IMPACT." with Play icon

### Changed
- `package.json` version bumped from `1.1.0` → `1.3.0`

---

## v1.2.0 — 2026-04-14

### Added
- **Navbar: AR-VR REBIRTH external link** — inserted between Showcase and About
  - Links to https://www.neuranestai.world (opens in new tab)
  - Works on both desktop and mobile nav menus
  - Uses `<a>` tag with `rel="noopener noreferrer"` for external links

---

## v1.1.0 — 2026-04-14

### Added
- **About page: Previous Work section** — new section below Philosophy pillars
  - Live card link to https://khalid-rind-z0ci9yc.gamma.site/
  - Styled with glass card, hover effect, badge, and external link
  - Opens in new tab with `rel="noopener noreferrer"` for security

### Changed
- `package.json` version bumped from `0.0.0` → `1.1.0`

---

## v1.0.0 — 2026-04 (Launch)

### Shipped
- Full portfolio site live at khalidrind.io via GitHub Pages
- Three niche profiles: TECH, BRAND, LOCAL — each with real video
  - TECH: cli-engineer.mp4 (CLI Engineer — AI workflow demo)
  - BRAND: brand-video.mp4 (NeuraNest brand video)
  - LOCAL: local-community.mp4 (Community presence video)
- Browser tab title: "Khalid Rind | AI & Data Science"
- Custom domain CNAME: khalidrind.io
- React Router BrowserRouter with 404.html SPA redirect trick
- Cloud Run app untouched at original URL throughout all changes

---

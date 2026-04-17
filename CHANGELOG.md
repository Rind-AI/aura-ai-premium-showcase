# CHANGELOG — khalidrind.io

All notable changes to this website are recorded here.
Format: version | date | what changed

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

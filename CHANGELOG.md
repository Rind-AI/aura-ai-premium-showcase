# CHANGELOG — khalidrind.io

All notable changes to this website are recorded here.
Format: version | date | what changed

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

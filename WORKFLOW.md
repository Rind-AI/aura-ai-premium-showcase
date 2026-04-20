# KHALIDRIND.IO — WEBSITE WORKFLOW
### For Khalid Rind & Any AI Model Taking Over This Project

**Live Site:** khalidrind.io
**GitHub Repo:** https://github.com/Rind-AI/aura-ai-premium-showcase
**Cloud Run (do not touch):** https://aura-ai-premium-digital-showcase-620735810303.us-west1.run.app/
**Project Folder:** `C:/AI-AIR-TEAM-HQ/aura-ai---premium-digital-showcase (8)/`

---

## WHAT THIS PROJECT IS

A React + Vite portfolio website for Khalid Rind.
- Built originally in Google AI Studio
- Hosted on GitHub Pages at khalidrind.io via custom CNAME
- Three profile niches: TECH, BRAND, LOCAL — each with a real video
- A separate Cloud Run deployment also exists — NEVER modify it

---

## THE GOLDEN RULE — EVERY SINGLE TIME YOU BUILD

`npm run build` **WIPES** three critical files from `dist/`. You must patch them back every time after every build, before deploying:

### Step 1 — Build
```bash
cd "C:/AI-AIR-TEAM-HQ/aura-ai---premium-digital-showcase (8)"
npm run build
```

### Step 2 — Patch dist/index.html (add SPA redirect script + check title)
After build, open `dist/index.html` and add this script block inside `<head>` BEFORE the asset script tags:
```html
<script>
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```
Also confirm title is: `<title>Khalid Rind | AI & Data Science</title>`
Note: The JS asset filename changes on every build (e.g. `index-BXOrAYvI.js`) — keep whatever Vite generated, do not change it.

### Step 3 — Create dist/404.html (React Router fix for GitHub Pages)
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Khalid Rind | AI & Data Science</title>
    <script>
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### Step 4 — Write dist/CNAME (custom domain)
```bash
echo "khalidrind.io" > dist/CNAME
```

### Step 5 — Deploy to GitHub Pages
```bash
npx gh-pages -d dist --nojekyll
```

### Step 6 — Commit source changes to main
```bash
git add <changed files>
git commit -m "your message"
git push origin main
```

---

## HOW TO ADD A VIDEO TO A PROFILE

1. Copy video file into `public/videos/` folder
2. Keep file size under 90MB (GitHub hard limit is 100MB)
3. Edit `src/constants/nicheContent.ts`
4. Find the profile (`tech`, `creative`, `community`) and update `mediaSrc`:
   ```ts
   mediaSrc: "/videos/your-video-filename.mp4"
   ```
5. Run the full build → patch → deploy workflow above

**Current videos:**
- TECH profile → `/videos/cli-engineer.mp4`
- BRAND profile (`creative`) → `/videos/NNAI-BRAND-1.mp4` ← updated v1.4.2 (was brand-video.mp4)
- LOCAL profile (`community`) → `/videos/local-community.mp4`

**⚠️ VIDEO SIZE RULE — CRITICAL:**
- GitHub hard limit: 100 MB. Our rule: NEVER push video over **90 MB**.
- If source video is too large, compress with ffmpeg before adding to `public/videos/`:
  ```bash
  # Install ffmpeg (one time)
  winget install Gyan.FFmpeg
  
  # Compress (adjust -crf 28 higher = smaller file, lower quality)
  "C:/Users/ksr11/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.1-full_build/bin/ffmpeg.exe" \
    -i input.mp4 -vcodec libx264 -crf 28 -preset medium -acodec aac -b:a 128k output.mp4
  ```
- Example: `NNAI-BRAND-1.mp4` was 172 MB → compressed to 17 MB with `crf 28`

---

## HOW TO ADD A FILE (PDF, IMAGE, ETC.) TO THE SITE

1. Copy file into `public/` folder
2. It will be served at `khalidrind.io/filename.ext`
3. Link to it in code as `/filename.ext` (not a full URL)
4. Run the full build → patch → deploy workflow above

**Current public files:**
- `/videos/` — profile videos + 8 showcase videos (see full list below)
- `/Khalid-Rind.pdf` — Khalid's portfolio PDF (linked from About page)

**All videos in `public/videos/`:**
| File | Used In | Size |
|------|---------|------|
| `NNAI-BRAND-1.mp4` | BRAND profile hero + Showcase #1 | 17 MB |
| `cli-engineer.mp4` | TECH profile hero | ~0.6 MB |
| `local-community.mp4` | LOCAL profile hero | ~2.3 MB |
| `NNAI-MAIN-VIDEO.mp4` | (available) | ~0.6 MB |
| `KR-APP-2.mp4` | Showcase video | ~6.4 MB |
| `KR-APP-3.mp4` | Showcase video | ~11.4 MB |
| `KR-FAMILY.mp4` | Showcase video | ~24.7 MB |
| `KR-SHOWCASE.mp4` | Showcase video | ~14.5 MB |
| `MelbourneWaterCampain.mp4` | Showcase video | ~49.2 MB |
| `ROAD-SAFETY-CAMPAIN.mp4` | Showcase video | ~40.0 MB |
| `SKY-FALL.mp4` | Showcase video | ~27.2 MB |
| `brand-video.mp4` | (replaced — kept as backup) | ~39.9 MB |

---

## HOW TO MAKE A PAGE CHANGE

All pages are in `src/pages/`:
- `Home.tsx` — landing page
- `About.tsx` — about + philosophy + previous work
- `Services.tsx` — services offered
- `Showcase.tsx` — portfolio showcase (videos FIRST, then Innovation Gallery below — v1.4.3)
- `Contact.tsx` — contact form

Edit the relevant file, then run the full build → patch → deploy workflow.

---

## HOW TO CHANGE NAVBAR STYLE

Navbar is at `src/components/layout/Navbar.tsx`.

**Current style (v1.4.3): Neon Blue**
- Bar background: `bg-black/90` with `border-[#00d4ff]/40` and `shadow-[0_2px_30px_rgba(0,212,255,0.15)]`
- All nav links: `text-[#00d4ff]/70` → hover: `text-[#00d4ff]` with `drop-shadow` glow
- Active page link: `text-[#00d4ff] drop-shadow-[0_0_10px_rgba(0,212,255,1)]`
- Mobile strip: `border-[#00d4ff]/30`, `bg-black/95`

To change navbar color: update the `#00d4ff` values to any hex color.

---

## SHOWCASE PAGE LAYOUT (v1.4.3)

The `/showcase` page renders in this order:
1. **VIDEO SHOWCASE** — "REAL WORK. REAL IMPACT." heading + 8 videos in 3-col grid (FIRST)
2. **INNOVATION GALLERY** — "DIGITAL SHOWCASE" heading + 4 project cards in 2-col grid (SECOND)
3. **CTA banner** — "READY TO BUILD YOUR LEGACY?"

To reorder: edit `src/pages/Showcase.tsx` — the two `<div>` sections are clearly marked with comments.

---

## VERSION & CHANGELOG

- Current version: **v1.7.5**
- Changelog file: `CHANGELOG.md` in project root
- After every change: bump version in `package.json` and add an entry to `CHANGELOG.md`

**Version format:** `MAJOR.MINOR.PATCH`
- MAJOR = full redesign
- MINOR = new section or new feature
- PATCH = small fix or content update

---

## SUPERNOVA PAGE — /supernova

The `/supernova` page is `src/pages/SupernovaInfographic.tsx`. It contains:
- A profile card that **expands on click** to reveal the full Khalid Rind profile
- Inside the expanded profile (in order):
  1. Hero photo + identity + stats grid
  2. Commander Profile Video (3 min)
  3. Audio overview
  4. Slide deck (6 animated cards)
  5. **PDF Slide Decks** — 6 PDF cards (hosted at `/pdfs/`)
  6. Infographic
  7. **Previous Projects** — 9 client audit dashboards (hosted at `/previous-projects/`)
  8. **Template Gallery** — 10 website/dashboard templates (hosted at `/templates/`)
  9. **Live Projects** — 14 live site cards (external URLs)

**To add a new live project:** Edit `liveProjects` array in `SupernovaInfographic.tsx`
**To add a new template:** Copy HTML to `public/templates/`, add to `templates` array
**To add a new client audit:** Copy HTML to `public/previous-projects/`, add to `previousProjects` array
**To add a new PDF:** Copy PDF to `public/pdfs/`, add to `slideDecks` array

---

## HOME PAGE — 2ND HERO VIDEO

Located between the Features Grid and Contact section in `src/pages/Home.tsx`.
- Custom play/pause button (no native browser controls)
- Sound enabled — click to play with audio
- Video file: `/videos/2ND-HERO-VIDEO.mp4`
- Uses `useRef` + `useState` — toggle logic in `togglePlay` function

---

## KEY FILES MAP

```
aura-ai---premium-digital-showcase (8)/
├── src/
│   ├── pages/
│   │   ├── About.tsx                  ← Previous Work section
│   │   ├── Home.tsx                   ← 2nd Hero Video section (custom player)
│   │   ├── Services.tsx
│   │   ├── Showcase.tsx
│   │   ├── Contact.tsx
│   │   └── SupernovaInfographic.tsx   ← SUPERNOVA — full profile + all galleries
│   ├── components/
│   │   └── sections/Hero.tsx          ← Video rendering logic
│   └── constants/
│       └── nicheContent.ts            ← THREE PROFILES: tech, creative, community
├── public/
│   ├── videos/                        ← All video files
│   ├── pdfs/                          ← 6 PDF slide decks (NEW — v1.7.5)
│   ├── templates/                     ← 10 HTML templates (NEW — v1.7.3)
│   ├── previous-projects/             ← 9 client audit dashboards (NEW — v1.7.4)
│   │   └── apm/                       ← APM built React app (index.html + assets/)
│   ├── gallery/
│   │   ├── templates/                 ← 3 template screenshots
│   │   └── projects/                  ← 7 client preview images
│   └── Khalid-Rind.pdf               ← Portfolio PDF
├── dist/                              ← Built output (patched before every deploy)
├── index.html                         ← Root template
├── vite.config.ts                     ← base: './' — DO NOT CHANGE
├── package.json                       ← version tracking
├── CHANGELOG.md                       ← version history
└── WORKFLOW.md                        ← THIS FILE
```

---

## WHAT TO NEVER DO

- NEVER change `vite.config.ts` base from `'./'` — it will break Cloud Run
- NEVER deploy without patching `dist/index.html`, `dist/404.html`, and `dist/CNAME`
- NEVER push a video over 90MB — GitHub will reject it
- NEVER touch the Cloud Run URL or its source — it is a separate live system
- NEVER run `git add .` blindly — add specific files only

---

## FIRST TIME SETUP (if starting fresh on a new machine)

```bash
# 1. Clone the repo
git clone https://github.com/Rind-AI/aura-ai-premium-showcase.git

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev

# 4. Deploy (always follow the build → patch → deploy steps above)
```

GitHub Pages was configured to serve from the `gh-pages` branch.
Custom domain `khalidrind.io` is set via CNAME file — always include it in dist before deploying.

---

*Last updated: 2026-04-20 | v1.7.5 | Legend Claude + Emperor Khalid Rind*

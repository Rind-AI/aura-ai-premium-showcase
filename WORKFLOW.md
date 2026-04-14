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
- BRAND profile (`creative`) → `/videos/brand-video.mp4`
- LOCAL profile (`community`) → `/videos/local-community.mp4`

---

## HOW TO ADD A FILE (PDF, IMAGE, ETC.) TO THE SITE

1. Copy file into `public/` folder
2. It will be served at `khalidrind.io/filename.ext`
3. Link to it in code as `/filename.ext` (not a full URL)
4. Run the full build → patch → deploy workflow above

**Current public files:**
- `/videos/` — three profile videos
- `/Khalid-Rind.pdf` — Khalid's portfolio PDF (linked from About page)

---

## HOW TO MAKE A PAGE CHANGE

All pages are in `src/pages/`:
- `Home.tsx` — landing page
- `About.tsx` — about + philosophy + previous work
- `Services.tsx` — services offered
- `Showcase.tsx` — portfolio showcase
- `Contact.tsx` — contact form

Edit the relevant file, then run the full build → patch → deploy workflow.

---

## VERSION & CHANGELOG

- Current version: **v1.1.1**
- Changelog file: `CHANGELOG.md` in project root
- After every change: bump version in `package.json` and add an entry to `CHANGELOG.md`

**Version format:** `MAJOR.MINOR.PATCH`
- MAJOR = full redesign
- MINOR = new section or new feature
- PATCH = small fix or content update

---

## KEY FILES MAP

```
aura-ai---premium-digital-showcase (8)/
├── src/
│   ├── pages/
│   │   ├── About.tsx          ← Previous Work section lives here
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── Showcase.tsx
│   │   └── Contact.tsx
│   ├── components/
│   │   └── sections/Hero.tsx  ← Video rendering logic lives here
│   └── constants/
│       └── nicheContent.ts    ← THREE PROFILES: tech, creative, community
├── public/
│   ├── videos/                ← All video files live here
│   └── Khalid-Rind.pdf        ← Portfolio PDF
├── dist/                      ← Built output (patched before every deploy)
├── index.html                 ← Root template (Vite reads this for title)
├── vite.config.ts             ← base: './' — DO NOT CHANGE
├── package.json               ← version tracking
├── CHANGELOG.md               ← version history
└── WORKFLOW.md                ← THIS FILE
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

*Last updated: 2026-04-14 | v1.1.1*

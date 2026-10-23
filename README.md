# Pearl Developers — Website

React + Vite site for **Pearl Developers Limited**, ready to deploy on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # preview the production build
```

Requires Node.js 18+.

## Deploy to Vercel

**Option A — GitHub (recommended)**
1. Create a GitHub repo and push this folder (`git init`, `git add .`, `git commit -m "init"`, `git push`).
2. On vercel.com → *Add New → Project* → import the repo.
3. Vercel detects Vite automatically (Build: `npm run build`, Output: `dist`). Click **Deploy**.
4. Add your domain under *Project → Settings → Domains*.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production
```

`vercel.json` already rewrites all routes to `index.html`, so links like `/services/mobile-apps` work on refresh.

## Editing content

Almost everything lives in **`src/data/site.js`**:
- `company` — email, phone, WhatsApp, address, socials (**replace the placeholders marked TODO**)
- `stats` — the numbers on Home/About
- `services` — the 8 services (each gets its own page at `/services/<slug>`)
- `solutionGroups` — the 39 ready-made systems catalogue
- `industries`, `projects`, `values`, `process`, `testimonials`, `team`

Project cards use generated artwork. To use real screenshots, put images in `/public/work/` and add `image: '/work/your-file.jpg'` to a project. Team photos: `/public/team/` + `photo: '/team/name.jpg'`.

### Contact form
By default the form opens the visitor's email app. To receive submissions directly, create a free form at formspree.io and paste the endpoint into `FORM_ENDPOINT` in `src/pages/Contact.jsx`.

## Structure

```
src/
  App.jsx                 routes, smooth scroll, page transitions
  styles.css              all styling (colours/fonts at the top in :root)
  data/site.js            all content
  components/
    PearlScene.jsx        3D hero (three.js): pearl, arches, water reflection
    Header.jsx            top bar, mega menus, full-screen side menu
    Sections.jsx          services index, project grid, solutions, industries…
    ProjectArt.jsx        generated project card artwork
    Footer.jsx, Extras.jsx (cursor, grain, chat button), ui.jsx (helpers)
  pages/                  Home, About, Services (+detail), Solutions, Industries, Work, Contact, 404
```

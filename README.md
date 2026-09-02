# Trifork Design System

A code-first design system for Trifork, extracted from the official brand guide (brand.trifork.com, Design Guide March 2026), the General presentation template and the Figma sandbox "Trifork / Vision AI". It ships as:

- **an npm package** (`@trifork/design-system`): tokens, CSS, slide layouts, icons, fonts, logo, backgrounds;
- **a Storybook** (`npm run storybook`, published to GitHub Pages by the workflow);
- **a Claude Design system**: `DESIGN.md` plus self-contained `@dsCard` component previews;
- **Claude Code rules**: `CLAUDE.md`.

```
DESIGN.md                    The brief for Claude Design and humans: theme, colours, type, components, slides, rules
design-tokens.json           SOURCE OF TRUTH. W3C DTCG tokens, 3 tiers: primitive -> semantic -> component
tokens/tokens.css            generated  CSS custom properties (--tf-*)
tokens/tokens.js             generated  resolved values (ESM)
tokens/tailwind.preset.cjs   generated  Tailwind preset
tokens/fonts.css             generated  @font-face for the self-hosted fonts
tokens/base.css              hand-written web component classes (.btn .pill .chip .card .step .stair .hero .tile .icon .person .org ...)
tokens/slides.css            hand-written slide system (.slide, .slide-frame, .s-* blocks) on a 1920x1080 canvas
components/src/*.html        preview sources; first line <!-- @dsCard group="..." title="..." -->
components/<name>/index.html generated  self-contained previews for Claude Design (fonts + CSS inlined)
components/icons*/           generated  icon sheets
stories/                     Storybook: GettingStarted, SlideBuilder (args-driven), lib/slide.js helpers, generated/*.stories.js
assets/icons/*.svg           37 product line icons (24px, currentColor, 100-grid / 6 stroke)
assets/icons/brand/*.svg     113 official brand icons (24px, currentColor, 40-grid / 1.8 stroke)
assets/logo/                 Trifork wordmark: dark, light, currentColor
assets/backgrounds/          Component 5 bokeh backgrounds (4 variants)
assets/fonts/                Poppins 300-700 + Caveat 500 (woff2, latin + latin-ext, OFL)
_ds_manifest.json            generated  card index for Claude Design
scripts/build.mjs            regenerates everything marked "generated"
scripts/serve.mjs            tiny static server for the previews
.storybook/                  Storybook (html-vite) config and Trifork theme
.github/workflows/           Storybook -> GitHub Pages on push to main; npm publish on v* tags
```

## Use it

### In a web project
```bash
npm install @trifork/design-system
```
```js
import "@trifork/design-system/fonts.css";
import "@trifork/design-system/tokens.css";
import "@trifork/design-system/base.css";
import "@trifork/design-system/slides.css"; // only for decks
import tokens from "@trifork/design-system";   // resolved values
```
Tailwind: `presets: [require("@trifork/design-system/tailwind")]`.
Icons: inline the SVG from `@trifork/design-system/icons/<name>.svg` inside `<span class="icon icon--xl">…</span>`; the colour comes from `currentColor`.

### In Claude Design (claude.ai/design)
- **claude.ai/design → Create new design system → Add assets**: upload `DESIGN.md` (and optionally `design-tokens.json`, `tokens/*.css`, `assets/`).
- Or link this GitHub repository so Claude reads tokens, `base.css`, `slides.css` and the previews directly.
- Or push the previews from Claude Code: `/design-login` once in an interactive session, then `/design-sync` in this folder. It uploads `components/**/index.html` (each has an `@dsCard` marker) and registers them as cards grouped Foundations / Actions / Content / Layout / Slides / Icons.

### In Claude Code (any project)
Add this repo as a dependency or submodule and put in the project's `CLAUDE.md`:
`Follow node_modules/@trifork/design-system/DESIGN.md and use the --tf-* tokens from its tokens.css.`

### Storybook
```bash
npm install
npm run storybook          # http://localhost:6006
npm run build-storybook    # static site in storybook-static/
```
The "Slides / Slide builder" stories are args-driven: change variant (light / dark / orange / photo), titles, bullet lists, KPI values and team members from the controls panel.

## Edit and rebuild
1. Change `design-tokens.json`, `tokens/base.css`, `tokens/slides.css` or `components/src/*.html`.
2. `npm run build` (runs `node scripts/build.mjs`).
3. `npm run preview` and open `http://localhost:8765/components/cards/`, or `npm run storybook`.

## Release
- Push to `main` → the Storybook workflow deploys to GitHub Pages (enable Pages → "GitHub Actions" in the repo settings once).
- Tag `vX.Y.Z` → the release workflow runs `npm publish` (needs an `NPM_TOKEN` secret with rights to the `@trifork` scope; rename the package in `package.json` if the scope is not available).

## Provenance and judgement calls
- Official values (hex, Pantone, 8px grid, 12/24px radii, Poppins rules, icon rules, logo clearance) come from the Design Guide PDF. `trifork/marketing-mcp` serves the same PDF as markdown, so both stay consistent by construction.
- Slide layouts, sizes and margins were measured from `Trifork-Presentation-Template-1.pptx` (63 slides, 1920×1080, exported from Figma Slides), rendered and inspected slide by slide.
- Screen practice (slate `#425663`, ink `#373737`, 20px cards, pill controls, slate-tinted shadows, section rhythm, bokeh backgrounds, product-tile gradients, icon stroke 6/100) comes from scanning 6,043 nodes in the Figma sandbox.
- Web type sizes are Figma sizes × 0.75; slide sizes are PowerPoint pt × 1.333.
- Inter, Helvetica and PT Sans appear in Figma drafts and are excluded. The VPN-only presentation pages (Company, Case slides, Pitch decks, Employer branding) were not reachable and are not covered yet.
- Not yet in the icon set: text-swap, image-swap, OCR (multi-part in Figma).

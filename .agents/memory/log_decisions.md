# Decisions — Trifork Design System

## 2026-09-02 — Source hierarchy and judgement calls
- **Sources, in order of authority:** brand.trifork.com Design Guide PDF (March 2026) > official General slide template (PPTX, 63 slides) and Dark icon pack > Figma sandbox "Trifork / Vision AI" (screen practice). The `trifork/marketing-mcp` server serves the same PDF as markdown, so it adds no new values.
- **Two dark blues, deliberately:** official `#2C3A42` (logo, print, slide titles, `surface.inverseDeep`) and Figma slate `#425663` (web UI dark surfaces, pills, headings). Slide body text is `#4D5B64` from the PPTX.
- **Web type scale = Figma size x 0.75** (Figma canvas is 1728px). Slide type is measured in canvas px on 1920x1080 (pt x 1.333).
- **Radii:** brand rule 12/24 kept as tokens; 20px is the working card radius on web (Figma), 44px on slides (PowerPoint adj 0.10-0.12 on ~400px cards).
- **Format:** DESIGN.md + `@dsCard` preview HTML (Claude Design), W3C DTCG `design-tokens.json` as the single source, generated CSS/JS/Tailwind, Storybook (html-vite) and an npm package layout. One build script regenerates everything; previews and stories share the same `components/src` markup.
- **Fonts self-hosted** (Poppins 300-700, Caveat 500, latin + latin-ext woff2, OFL) in `assets/fonts`; previews inline them as data URIs so each preview file is self-contained.
- **Excluded as drafts:** Inter, Helvetica, PT Sans found in Figma; the VPN-only presentation pages (Company, Case slides, Pitch decks, Employer branding) return 403 and were not extracted.

# Trifork Design System — rules for Claude Code

This folder is a code-first design system published as an npm package, a Storybook and a Claude Design system. When you build or change UI here, or in any project that includes this package, follow these rules.

## Sources of truth
1. `design-tokens.json` — every colour, size, radius, shadow, gradient and slide measurement. Never hard-code a value that exists as a token; use the `--tf-*` variables from `tokens/tokens.css` (or `tokens/tokens.js` / the Tailwind preset).
2. `DESIGN.md` — the visual rules and the reasoning, including the 17 slide types and the people/structure patterns. Read it before designing anything.
3. `tokens/base.css` (web classes: `.btn .pill .chip .card .step .stair .hero .tile .icon .person .avatar .org .ds-section`) and `tokens/slides.css` (`.slide`, `.slide-frame`, `.s-*` blocks). Reuse them; extend with modifiers rather than parallel classes.

## Workflow
- Edit `design-tokens.json`, `tokens/base.css`, `tokens/slides.css` or `components/src/*.html`, then run `npm run build`. Never hand-edit generated files: `tokens/tokens.css`, `tokens/tokens.js`, `tokens/tailwind.preset.cjs`, `components/<name>/index.html`, `components/icons*/`, `stories/generated/`, `_ds_manifest.json`.
- Every preview source starts with `<!-- @dsCard group="…" title="…" subtitle="…" width="…" -->`. Groups: Foundations, Actions, Content, Layout, Slides, Icons. Placeholders: `{{icon:name}}`, `{{bicon:name}}`, `{{logo}}`, `{{bokeh:N}}`.
- Slides are authored at 1920×1080 inside `.slide-frame` (scaled with `--slide-scale`). Args-driven slide stories live in `stories/SlideBuilder.stories.js` using `stories/lib/slide.js`.
- Icons: add 24px `currentColor` SVGs to `assets/icons/` (product style, 100-grid / 6 stroke) or `assets/icons/brand/` (official, 40-grid / 1.8 stroke), then rebuild; the sheets and stories update themselves.
- Verify visually: `npm run preview` (static previews) or `npm run storybook`.

## Non-negotiables when generating UI
- Poppins only (self-hosted via `tokens/fonts.css`). Slate `#425663` title, orange `#FF6600` subtitle beneath, ink `#373737` body. On slides: Regular headlines, `#2C3A42` titles, `#4D5B64` body.
- Every control is a pill; cards are 20px radius (44px on slides) with the slate shadow and no border; photos are rounded.
- Sections alternate white / light blue `#D7E4EB` / slate, 96px padding, 24px gaps, 8px grid. Slides: 80px margins, 64px body indent, label top-left, logo bottom-right.
- Icons: one colour, uniform stroke, sizes 20/24/32/48/72.
- Orange is an accent: CTA, current-step pill, labels, subtitles, card titles, bullet dashes, agenda numbers. Never large orange areas or orange body text (the orange section-title slide is the one exception).
- Gradients only: slate fades, product-tile families, bokeh backgrounds.
- Do not use Inter, Helvetica, emoji, filled icons, black shadows, bordered cards or boxed org charts.

## Claude Design
`DESIGN.md` is the import file for claude.ai/design. `components/**/index.html` are the `@dsCard` previews for `/design-sync`. Keep both in sync with the tokens whenever you change anything.

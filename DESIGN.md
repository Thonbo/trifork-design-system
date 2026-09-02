# Trifork Design System — DESIGN.md

> Single-file brief for AI agents (Claude Design, Claude Code) and humans. Token values live in `design-tokens.json`; this file explains *what* to use and *why*. Sources: brand.trifork.com Design Guide (March 2026) and the Figma sandbox "Trifork / Vision AI" (file `WH67wv40VWYN27v9yzsaG4`), September 2026.

## 1. Visual theme & atmosphere

Trifork is a Danish engineering company. The look is **calm, clear, engineered**: lots of light-blue air, one warm orange accent, white cards floating on soft slate shadows, and light line icons. It should feel like a well-run factory floor photographed at golden hour, not like a startup landing page.

- **Mood:** confident, human, practical. Photos of real people at work; no stock-photo gloss.
- **Density:** spacious. Sections breathe with 96px padding; cards hold one idea each.
- **Shapes:** everything is rounded. Cards 20px, controls are full pills, photos always have rounded corners. Nothing has a visible border except form inputs.
- **Depth:** no lines, no outlines. Depth comes from surface changes (white on light blue on slate) and soft slate-tinted blur shadows.
- **Motion:** minimal. 200ms standard easing on hover; one reveal per page at most.
- **Signature elements:** the slate "Step N" pill above a white card; an orange subtitle under a slate title; a hero photo/video fading down into slate; light-blue bokeh backgrounds behind diagrams; isometric gradient product tiles.

## 2. Color palette & roles

### Core brand (official)

| Role | Name | Hex | Notes |
|---|---|---|---|
| Foundation | Dark blue | `#2C3A42` | Titles, body, selected backgrounds. Pantone 432 C. Logo dark version. |
| Accent | Orange | `#FF6600` | Labels, subtitles, key details, primary CTA, the dot in the logo. Never a large fill. Pantone 16-1358 TCX. |
| Background | Light blue | `#D5E5ED` | Primary digital background (website, social). Pantone 9420 C. |

### UI working colours (from Figma, used in every screen)

| Token | Hex | Use |
|---|---|---|
| `slate.700` | `#425663` | Dark UI surfaces: dark cards, step pills, footer, icons, headings on screen. A touch lighter/bluer than the official dark blue so it works as a fill. |
| `ink` | `#373737` | Body copy on screen. |
| `surfaceTint.band` | `#D7E4EB` | The light-blue section/page background as rendered on screen. |
| `surfaceTint.pale` | `#E7EFF3` | A quieter light section, between white and band. |
| `surfaceTint.offWhite` | `#F3F3F3` | Card footers ("1-3 days"), quiet bands. |
| `white` | `#FFFFFF` | Cards, chips, page. |

### Neutrals (dark → light)
`#2C3A42 #414E55 #566168 #6B757B #80898E #959CA0 #ABB0B3 #C0C4C6 #D5D8D9 #EAEBEC`

### Extended palette (data viz only)
- Blue: `#3C4C54 #5B717F #7997A9 #88AABE #97BDD3 #A1C4D7 #ACCADC #C1D7E5 #D5E5ED #EAF2F6`
- Orange: `#662900 #993D00 #CC5200 #E55C00 #FF6600 #FF751A #FF8533 #FFA366 #FFD1B2 #FFE8D9`
- Green: `#364C31 #51724A #6A9463 #7AAB6F #87BE7B #93C488 #9FCB95 #B7D8B0 #CFE5CA #E7F2E5`
- Categorical order: slate, orange, blue-600, green-500, orange-200, blue-300.

### Product families (3D tiles only)
- Blue `#52788F → #71A2BD → #385A72` (top tint `#F4F8FA → #E7EFF3`) — Quality management
- Green `#618671 → #80AF97 → #457055` (top tint `#F8FBF9 → #EAF2ED`) — Asset inspection & monitoring
- Purple `#9350A4 → #C172D1 → #89459F` (top tint `#FDF8FF → #F9E5FD`) — Safety

### Semantic mapping (CSS variables, prefix `--tf-`)

```css
--tf-color-surface-page: #FFFFFF;      --tf-color-surface-band: #D7E4EB;
--tf-color-surface-inverse: #425663;   --tf-color-surface-card-footer: #F3F3F3;
--tf-color-text-heading: #425663;      --tf-color-text-body: #373737;
--tf-color-text-accent: #FF6600;       --tf-color-text-muted: #6B757B;
--tf-color-text-on-inverse: #FFFFFF;   --tf-color-action-primary: #FF6600;
--tf-color-action-primary-hover: #E55C00; --tf-color-border-focus: #FF6600;
```

Section rhythm on a page: **white → light blue (band) → slate (inverse) → white …** The hero and the footer are slate.

## 3. Typography rules

- **Family:** Poppins for everything (Google Fonts). Caveat only for quotes in presentations. No Inter, Helvetica or system fonts in finished work.
- **Weights:** keep to two per design. Brand guide: Regular for headlines and body. Product/web (Figma): **Bold** section titles and card titles, **Medium** subtitles and body, **SemiBold caps** labels.
- **Tracking:** −0.02em on anything 28px and larger. Labels +0.15em.
- **Line height:** 1.32 for titles and subtitles, 1.2 inside cards, 1.5 for running text.

| Style | Size / LH | Weight | Colour |
|---|---|---|---|
| Display | 56 / 1.1 | Bold | slate |
| H1 (section title) | 48 / 1.32 | Bold (Regular in editorial layouts) | slate |
| H2 | 36 / 1.32 | Bold | slate |
| Subtitle | 28 / 1.32 | Medium | **orange** |
| H3 | 28 / 1.32 | Medium | slate |
| H4 / card title | 22 / 1.2 | Bold | **orange** on white cards, white on dark |
| Body large | 20 / 1.5 | Regular | ink |
| Body | 18 / 1.5 | Regular (Medium inside cards) | ink |
| Body small | 16 / 1.5 | Regular | ink |
| Caption | 14 | Regular | muted |
| Label | 13 | SemiBold, ALL CAPS, 0.15em | orange |

Pattern: **slate title, orange subtitle directly underneath.** One phrase in a headline may be orange for emphasis.

Figma → web scale: Figma was authored at 1728px; web sizes are Figma × 0.75 (64 → 48, 36 → 28, 29 → 22, 24 → 18).

## 4. Component stylings

- **Button:** pill, 48px tall, 0 32px padding, Poppins SemiBold 16. Primary = orange fill, white text; hover `#E55C00`, active `#CC5200`. Outline = 2px orange border, orange ALL-CAPS 13px label with 0.15em tracking (the brand-guide "DOWNLOAD" button). Dark = slate fill. Ghost = text only. Focus ring: 3px orange, 3px offset. Min hit target 44px.
- **Step pill:** slate `#425663` pill, Poppins Bold 22 white, 8/32 padding. Orange variant for the current or final step. Vertical variant (writing-mode) in stair layouts.
- **Chip:** white pill, SemiBold 16 slate text, 8/24 padding, soft shadow. Used for data items ("Product data", "ERP") and navigation.
- **Card:** white, 20px radius, shadow `0 4px 36px rgba(66,86,99,.2)`, no border, 24px padding, 16px internal gap. Title orange Bold 22, body ink. Centred variant for step cards with a 72px line icon on top and 40px top padding. Off-white footer band `#F3F3F3` for durations. Dark variant: slate fill, white text.
- **Step card** = pill + card + footer, stacked with 16px gap.
- **Stair row** = 72px icon + vertical pill + card, each row indented further to the right.
- **Hero:** photo or video full-bleed, `linear-gradient(180deg, rgba(66,86,99,0) 0%, #425663 100%)` overlay, white Bold 48 title with `0 2px 16px rgba(0,0,0,.55)` text shadow, orange Medium 28 subtitle, three 72×12 white pill dots (inactive 45%).
- **Product tile:** 28px radius isometric cube; light tint gradient top face with a line icon; coloured gradient body; glow `0 0 32px rgba(66,86,99,.3), 0 0 8px rgba(66,86,99,.4)`.
- **Inputs:** 48px tall, 12px radius, 2px `#C0C4C6` border, orange border + `#FFD1B2` halo on focus. The only bordered element.
- **Badge:** 4px radius, SemiBold 14, tinted background. The only non-pill small element.
- **Photos:** always rounded (20px), always from brand.trifork.com with consent.
- **Icons:** see §9.

## 5. Layout principles

- **Grid:** 8px base. Half step (4px) only for icon/label micro-spacing.
- **Scale:** 4 · 8 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128.
- **Sections:** 96px padding on all sides (48/24 on phones), 24px gap between title, subtitle and content.
- **Grids:** 24px gap; 3 or 4 columns of cards; step rows scroll horizontally when there are more than 5.
- **Content width:** 1440 desktop canvas, 1200 content max.
- **Alignment:** section titles centred on marketing pages, left-aligned in documents and dashboards.
- **Corner radius:** 12px below 200px, 24px above (brand). In practice: 20px cards and images, 28px tiles, pill for every control.

## 6. Depth & elevation

Shadows are always slate-tinted, wide and soft, almost no offset.

| Token | Value | Use |
|---|---|---|
| `shadow.soft` | `0 1px 32px rgba(114,141,157,.10), 0 1px 8px rgba(95,125,143,.20)` | chips, tiles |
| `shadow.card` | `0 4px 36px rgba(66,86,99,.20)` | default card |
| `shadow.lift` | `0 2px 20px rgba(66,86,99,.20)` | hover, popovers |
| `shadow.glow` | `0 0 32px rgba(66,86,99,.30), 0 0 8px rgba(66,86,99,.40)` | halo under 3D tiles |

Surface ladder (back → front): slate → light blue band → pale → white card → white chip.

### Backgrounds ("Component 5")
Four interchangeable bokeh photographs (`assets/backgrounds/bokeh-1..4.jpg`): a `#D7E4EB` light-blue field with soft out-of-focus white and warm-cream blooms, luminance range roughly `#C5D7E1` to `#F6F2EE`. Use full-bleed behind hero diagrams, slides and "proof" charts; white and dark cards sit on top. Never behind dense body text. CSS fallback: `--tf-gradient-bokeh-css`.

### Fades
- `fadeSlateUp` transparent → slate, for text over media.
- `fadeSlateDown` slate → transparent, vertical dividers.
- Hatched slate (`repeating-linear-gradient(135deg, #425663 0 14px, #5A6E7B 14px 28px)`) for "value" bars in charts; fade the last bar out to the right.

## 7. Do's and don'ts

**Do**
- One orange primary action per view. Orange for subtitles, labels, card titles, the logo dot.
- Slate title + orange subtitle, always in that order.
- Pill every control. Round every photo.
- Light line icons, one colour, uniform stroke.
- Alternate white / light-blue / slate sections.
- Keep two type weights per design.

**Don't**
- No orange body text or large orange fills (only the CTA, pills and small legend squares).
- No borders on cards; no pure-black shadows; no drop shadows with visible offset.
- No gradients except the slate fades, the product-tile families and the bokeh backgrounds.
- No emoji, no filled/duotone icons, no Inter/Helvetica.
- No logo on orange; no elements inside the logo clearance zone (height of the "T" on all sides).
- No square corners (except 4px badges and 4px legend squares).

## 8. Responsive behaviour

- Breakpoints: 720 (phone), 1024 (tablet), 1440 (desktop canvas).
- Below 720: section padding 48/24, H1 36, H2 28, cards stack single column, step rows become a horizontal scroll with 16px gap, hero min-height 360.
- Touch targets ≥ 44px; pills already are.
- Type never goes below 14px on screen, 12pt in print.

## 9. Iconography

- Monochrome line icons drawn on a **100×100 grid with a 6px stroke** (= 3px at 50px, 1.5px at 24px). Round caps and joins, softly rounded corners, uniform weight; small filled details (dots, checks) allowed.
- Sizes: 20 sm · 24 md (inline, buttons) · 32 lg · 48 xl · 72 hero (cards, stair steps).
- Colour: slate on light, white on slate, orange only when the icon *is* the accent.
- Set: 37 icons in `assets/icons/*.svg` (`currentColor`, 24px default), e.g. `search-gear` (walk the line), `scales` (explore), `map-route` (plan), `checklist-document` (lab test), `factory-check` (pilot), `laptop-code-gear` (development), `hands-heart-care` (hypercare), `cubes-network` (scale up), `server-stack`, `ai-brain`, `robot-arm`, `conveyor`, `video-camera`, `perspective-image`, `dashboard`.

## 10. Presentations (slides)

Measured from the official General Template (`Trifork-Presentation-Template-1.pptx`, 63 slides, 1920×1080, also on Figma Slides). Slides use **Poppins Regular** for every headline (never Bold), the official dark blue `#2C3A42` for titles, `#4D5B64` for body copy, and light blue `#D5E5ED` as the default background.

**Canvas grid**
- Margins 80px. Label at y72 (16px SemiBold caps orange). Title at y141. Body indented 64px (x144). Logo 125×12 bottom-right (73 from right, 56 from bottom). Slide number + presentation label bottom-left at 16px.
- Radius 44px on cards, photo tiles and tables; 24px on logo cards; pills for chips.
- Gaps 32px inside blocks, 64px between columns; 48px between cards.

**Type on slides (canvas px)**: H0 140 (section titles, Thank you) · H1 100 (cover) · H2 80 (agenda, quote, statement) · content title 76 · H3 64 · H5 32 Medium (names, agenda items) · subhead 30 · intro 24 · body 23 · small 17 · label 16 · tiny 13 · KPI number 133 (95 inside cards) · agenda numbers 64 Poppins **Light** orange.

**Backgrounds**: light blue (default), brand dark blue, photo with 72% dark-blue overlay, orange (section titles only). Alternate light and dark sections through a deck; never two orange slides in a row.

**Slide types** (all in `components/slides-*` and the Storybook "Slides" section):
1. Cover: image right / dark card / photo card, title 100px, footer "Presentation label / year".
2. Agenda: H2 left, numbered rows (Light 64 orange + 32) with hairlines at 114px pitch. Section list: small numbers + 32px titles.
3. Section title: label + H0 140, top-left or bottom-left, on any background.
4. Text: title + intro + bullets. Bullets are a 60×3 orange dash with 90px indent; sizes XL 24 / L 23 / M 20 / S 17.
5. Image + text: 720×912 rounded photo left or right, bullets beside it.
6. Columns 1-4 with 30px subheads; numbered columns with orange Light numbers, content bottom-aligned.
7. Numbers: 4-up 133px, cards (white, 95px), 2×2, list with hairlines; light and dark.
8. Cards: icon cards (80px icon, 30 title, 17 text), image cards 2/4-up, 6-grid.
9. Table: white rounded container, tinted header, bold total row.
10. Icon rows: 4 across, vertical list beside intro, 3×2 grid with dividers.
11. Statement: two-column 80px title + body; centred variant.
12. Quote: 80px in quotation marks, 86px round avatar, 32 Medium name, 16 role.
13. People: photo tiles 415×409 radius 44, name 32 Medium + role 18 bottom-left over a white fade; mosaic, portrait 4-up, 2×2, 4×2.
14. Product: dark, 235px meta column (tiny grey labels, white pill chips), product name with icon, customer case footer.
15. Case: light, meta column + photo mosaic.
16. Logo grid: white cards radius 24, 5 across.
17. Closing: logo on photo; "Thank You!" H0 with contact block.

## 11. People & structure

- **Profile tile**: rounded photo (20px web / 44px slides), name Medium, role muted; overlay variant puts the caption on a white fade at the bottom of the photo.
- **Avatars**: circles 32 / 48 / 86 / 120; initials on slate when no photo; stacked avatars overlap by 8px with a white ring.
- **Org structure**: slate pills for units, white chips for teams, hairline connectors, orange for the highlighted node. Never boxed org charts.
- **Testimonial**: 28px Regular quote in quotation marks, avatar row underneath.

## 12. Agent prompt guide

Paste into a prompt to keep Claude on-brand:

> Use the Trifork design system. Poppins only. Slate `#425663` headings with an orange `#FF6600` subtitle underneath; ink `#373737` body. Sections alternate white, light blue `#D7E4EB` and slate, each with 96px padding. Cards are white, 20px radius, shadow `0 4px 36px rgba(66,86,99,.2)`, no border, orange Bold titles. Every control is a pill; buttons are 48px orange pills. Step headers are slate pills above cards. Icons are 1.5px line icons in one colour. Photos are rounded. No gradients except slate fades and the product tiles; use the bokeh background only behind diagrams.

Files: `design-tokens.json` (source of truth) · `tokens/tokens.css` · `tokens/tailwind.preset.cjs` · `tokens/base.css` (component classes) · `components/*/index.html` (previews with `@dsCard` markers for Claude Design) · `assets/icons/` · `assets/backgrounds/`.

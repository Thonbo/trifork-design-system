import logo from "../assets/logo/trifork-logo.svg?raw";

export default { title: "Getting started", parameters: { layout: "fullscreen" } };

export const Overview = () => `
<div class="ds-page">
  <section class="ds-section" style="gap: 24px; max-width: 960px">
    <div style="width: 220px; color: var(--tf-color-brand-dark-blue)">${logo}</div>
    <p class="ds-label">Design system</p>
    <h1 class="ds-h1 ds-editorial">Trifork design system</h1>
    <p class="ds-body-lg">Tokens, base CSS, icon sets, slide layouts and component previews, extracted from the brand guide (brand.trifork.com), the Figma sandbox and the official presentation template. The same files feed Claude Design (<code>DESIGN.md</code> + <code>@dsCard</code> previews), Claude Code (<code>CLAUDE.md</code>) and this Storybook.</p>
    <div class="ds-grid" style="grid-template-columns: 1fr 1fr">
      <div class="card"><div class="card__body"><h3 class="card__title">Install</h3>
<pre class="ds-body-sm" style="margin:0; white-space: pre-wrap; font-family: var(--tf-font-family-mono); font-size: 13px">npm install @trifork/design-system

import "@trifork/design-system/fonts.css";
import "@trifork/design-system/tokens.css";
import "@trifork/design-system/base.css";
import "@trifork/design-system/slides.css"; // decks only</pre></div></div>
      <div class="card"><div class="card__body"><h3 class="card__title">Use</h3>
<pre class="ds-body-sm" style="margin:0; white-space: pre-wrap; font-family: var(--tf-font-family-mono); font-size: 13px">&lt;section class="ds-section ds-section--band"&gt;
  &lt;h2 class="ds-h2"&gt;The process&lt;/h2&gt;
  &lt;p class="ds-subtitle"&gt;and how we solve that&lt;/p&gt;
  &lt;div class="step"&gt;
    &lt;span class="pill"&gt;Step 1&lt;/span&gt;
    &lt;div class="card"&gt;…&lt;/div&gt;
  &lt;/div&gt;
&lt;/section&gt;</pre></div></div>
    </div>
    <div class="ds-grid" style="grid-template-columns: repeat(3, 1fr)">
      <div class="card card--flat" style="background: var(--tf-color-surface-band-soft)"><div class="card__body"><p class="ds-label">Colour</p><p class="ds-body-sm">Slate <b>#425663</b> heading, orange <b>#FF6600</b> subtitle underneath, ink <b>#373737</b> body. Sections alternate white / light blue / slate.</p></div></div>
      <div class="card card--flat" style="background: var(--tf-color-surface-band-soft)"><div class="card__body"><p class="ds-label">Shape</p><p class="ds-body-sm">Every control is a pill. Cards 20px radius, no border, slate shadow. Photos rounded. Slides use 44px on a 1920 canvas.</p></div></div>
      <div class="card card--flat" style="background: var(--tf-color-surface-band-soft)"><div class="card__body"><p class="ds-label">Type</p><p class="ds-body-sm">Poppins only. Two weights per design. Labels SemiBold caps with 15% tracking. Slides use Regular headlines.</p></div></div>
    </div>
    <p class="ds-caption">Source of truth: <code>design-tokens.json</code> → <code>node scripts/build.mjs</code> regenerates CSS, Tailwind preset, previews and these stories.</p>
  </section>
</div>`;

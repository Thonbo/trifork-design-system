#!/usr/bin/env node
/**
 * Trifork design system build.
 *
 *   node scripts/build.mjs
 *
 * 1. Flattens design-tokens.json (W3C DTCG, {dot.path} references) into
 *    tokens/tokens.css (CSS custom properties) and tokens/tokens.js.
 * 2. Builds tokens/tailwind.preset.cjs.
 * 3. Renders every components/src/*.html preview into components/<name>/index.html
 *    with the token, base and slide CSS inlined, so each preview is self-contained
 *    (this is what Claude Design's Design System pane and /design-sync read).
 * 4. Writes components/icons/index.html and components/icons-brand/index.html.
 * 5. Mirrors every preview into stories/generated/*.stories.js for Storybook.
 * 6. Writes _ds_manifest.json listing every preview card.
 *
 * Template placeholders available in components/src/*.html:
 *   {{icon:name}}        inline SVG from assets/icons/<name>.svg
 *   {{bicon:name}}       inline SVG from assets/icons/brand/<name>.svg
 *   {{logo}}             inline Trifork wordmark (currentColor)
 *   {{bokeh:N}}          background image N (data URI in previews, /backgrounds/ path in stories)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const write = (p, s) => { fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true }); fs.writeFileSync(path.join(root, p), s); };
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Caveat:wght@500&display=swap" rel="stylesheet">`;

// ---------- 1. tokens ----------
const tokens = JSON.parse(read("design-tokens.json"));
const flat = {};
(function walk(node, trail) {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith("$")) continue;
    if (v && typeof v === "object" && "$value" in v) flat[[...trail, k].join(".")] = { value: v.$value, type: v.$type };
    else if (v && typeof v === "object") walk(v, [...trail, k]);
  }
})(tokens, []);

const resolve = (val, depth = 0) => {
  if (depth > 10) throw new Error("token reference loop");
  if (typeof val === "string") return val.replace(/\{([^}]+)\}/g, (_, ref) => { if (!(ref in flat)) throw new Error(`unknown token reference {${ref}}`); return resolve(flat[ref].value, depth + 1); });
  return val;
};
const cssValue = (t) => {
  const v = resolve(t.value);
  if (t.type === "fontFamily") return v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ");
  if (t.type === "cubicBezier") return `cubic-bezier(${v.join(", ")})`;
  return String(v);
};
const varName = (key) => "--tf-" + key.replace(/^(primitive|semantic|component)\./, (m) => ({ "primitive.": "", "semantic.": "", "component.": "c-" }[m])).replace(/\./g, "-").replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const lines = [":root {"];
let tier = "";
for (const [key, t] of Object.entries(flat)) {
  const thisTier = key.split(".")[0];
  if (thisTier !== tier) { tier = thisTier; lines.push(`\n  /* ---- ${tier} ---- */`); }
  lines.push(`  ${varName(key)}: ${cssValue(t)};`);
}
lines.push("}\n");
const tokensCss = `/* Generated from design-tokens.json by scripts/build.mjs. Do not edit by hand. */\n` + lines.join("\n");
write("tokens/tokens.css", tokensCss);

const js = {};
for (const [key, t] of Object.entries(flat)) {
  const parts = key.split(".");
  let o = js;
  for (const p of parts.slice(0, -1)) o = o[p] ??= {};
  o[parts.at(-1)] = t.type === "fontFamily" ? resolve(t.value) : cssValue(t);
}
write("tokens/tokens.js", `// Generated from design-tokens.json. Resolved values.\nexport const tokens = ${JSON.stringify(js, null, 2)};\nexport default tokens;\n`);

// ---------- 2. tailwind preset ----------
const colors = {};
for (const [key, t] of Object.entries(flat)) {
  if (t.type !== "color" || !key.startsWith("primitive.color.")) continue;
  const parts = key.replace("primitive.color.", "").split(".");
  let o = colors;
  for (const p of parts.slice(0, -1)) o = o[p] ??= {};
  o[parts.at(-1)] = cssValue(t);
}
const pick = (prefix) => Object.fromEntries(Object.entries(flat).filter(([k]) => k.startsWith(prefix)).map(([k, t]) => [k.replace(prefix, ""), cssValue(t)]));
const preset = { theme: { extend: {
  colors: { ...colors, surface: pick("semantic.color.surface."), text: pick("semantic.color.text."), border: pick("semantic.color.border."), action: pick("semantic.color.action.") },
  fontFamily: Object.fromEntries(Object.entries(pick("primitive.font.family.")).map(([k, v]) => [k, v.split(", ")])),
  fontSize: pick("primitive.font.size."), spacing: pick("primitive.space."), borderRadius: pick("primitive.radius."), boxShadow: pick("primitive.shadow."), backgroundImage: pick("primitive.gradient."),
} } };
write("tokens/tailwind.preset.cjs", `// Generated from design-tokens.json. Use: presets: [require('./tokens/tailwind.preset.cjs')]\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`);

// ---------- 3. component previews ----------
const baseCss = read("tokens/base.css");
const slidesCss = read("tokens/slides.css");
// Self-hosted fonts: previews are single files, so inline the woff2 as data URIs.
const fontsCssInline = read("tokens/fonts.css").replace(/url\('\.\.\/assets\/fonts\/([^']+)'\)/g, (_, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(root, "assets", "fonts", f)).toString("base64")})`);
const allCss = `${fontsCssInline}\n${tokensCss}\n${baseCss}\n${slidesCss}`;
const srcDir = path.join(root, "components", "src");
const cards = [];
const iconsDir = path.join(root, "assets", "icons");
const brandIconsDir = path.join(root, "assets", "icons", "brand");
const iconFiles = fs.readdirSync(iconsDir).filter((f) => f.endsWith(".svg")).sort();
const brandIconFiles = fs.readdirSync(brandIconsDir).filter((f) => f.endsWith(".svg")).sort();
const fitSvg = (s) => s.replace(/width="24" height="24"/, 'width="100%" height="100%"');
const iconSvg = (name) => fitSvg(fs.readFileSync(path.join(iconsDir, name + ".svg"), "utf8"));
const brandIconSvg = (name) => fitSvg(fs.readFileSync(path.join(brandIconsDir, name + ".svg"), "utf8"));
const logoSvg = fs.readFileSync(path.join(root, "assets", "logo", "trifork-logo.svg"), "utf8");
const bokehData = (i) => "data:image/jpeg;base64," + fs.readFileSync(path.join(root, "assets", "backgrounds", `bokeh-${i}.jpg`)).toString("base64");

const renderTemplate = (html, { bokeh }) =>
  html
    .replace(/\{\{icon:([a-z0-9-]+)\}\}/g, (_, n) => iconSvg(n))
    .replace(/\{\{bicon:([a-z0-9-]+)\}\}/g, (_, n) => brandIconSvg(n))
    .replace(/\{\{logo\}\}/g, () => logoSvg)
    .replace(/\{\{bokeh:(\d)\}\}/g, (_, i) => bokeh(i));

const page = (title, body) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Trifork DS - ${title}</title>
${FONTS}
<style>
${allCss}
</style>
</head>
<body>
${body}
</body>
</html>
`;

const storyTitle = (group, title) => `${group}/${title.replace(/\//g, " ")}`;
const stories = [];
for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith(".html")).sort()) {
  const name = file.replace(/\.html$/, "");
  const src = read(`components/src/${file}`);
  const meta = /<!--\s*@dsCard\s+([^>]*?)-->/.exec(src);
  if (!meta) throw new Error(`${file}: missing <!-- @dsCard ... --> header`);
  const attrs = Object.fromEntries([...meta[1].matchAll(/(\w+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
  const body = src.replace(meta[0], "").trim();
  const title = attrs.title || name;
  const header = `<!-- @dsCard group="${attrs.group}" name="${title}"${attrs.subtitle ? ` subtitle="${attrs.subtitle}"` : ""} width="${attrs.width || 960}" -->\n`;
  write(`components/${name}/index.html`, header + page(title, renderTemplate(body, { bokeh: bokehData })));
  cards.push({ name: title, path: `components/${name}/index.html`, group: attrs.group, subtitle: attrs.subtitle || "", viewport: { width: Number(attrs.width || 960), height: attrs.height ? Number(attrs.height) : undefined } });
  const storyHtml = renderTemplate(body, { bokeh: (i) => `/backgrounds/bokeh-${i}.jpg` });
  stories.push({ name, title: storyTitle(attrs.group, title), html: storyHtml, subtitle: attrs.subtitle || "" });
}

// ---------- 4. icon sheets ----------
const sheet = (title, subtitle, files, svgOf, intro, sizesSvg) => {
  const cells = files.map((f) => { const n = f.replace(".svg", ""); return `<figure class="icon-cell"><div class="icon icon--xl">${svgOf(n)}</div><figcaption>${n}</figcaption></figure>`; }).join("\n");
  return `<div class="ds-page">
<style>
.icon-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:var(--tf-space-2)}
.icon-cell{margin:0;display:flex;flex-direction:column;align-items:center;gap:var(--tf-space-1);padding:var(--tf-space-2);background:var(--tf-c-card-bg);border-radius:var(--tf-radius-sm);box-shadow:var(--tf-shadow-soft)}
.icon-cell figcaption{font-size:11px;color:var(--tf-color-text-muted);text-align:center;word-break:break-word}
.sizes{display:flex;align-items:flex-end;gap:var(--tf-space-4);margin-bottom:var(--tf-space-4)}
.sizes > div{display:flex;flex-direction:column;align-items:center;gap:8px;font-size:12px;color:var(--tf-color-text-muted)}
</style>
<section class="ds-section">
  <p class="ds-label">Iconography</p>
  <h2 class="ds-h2">${title}</h2>
  <p class="ds-body">${intro}</p>
  <div class="sizes">
    <div><span class="icon icon--sm">${sizesSvg}</span>20 sm</div>
    <div><span class="icon icon--md">${sizesSvg}</span>24 md</div>
    <div><span class="icon icon--lg">${sizesSvg}</span>32 lg</div>
    <div><span class="icon icon--xl">${sizesSvg}</span>48 xl</div>
    <div><span class="icon icon--hero">${sizesSvg}</span>72 hero</div>
    <div style="background:var(--tf-color-surface-inverse);padding:12px;border-radius:12px;color:#fff"><span class="icon icon--xl" style="color:#fff">${sizesSvg}</span>on dark</div>
    <div><span class="icon icon--xl" style="color:var(--tf-color-icon-accent)">${sizesSvg}</span>accent</div>
  </div>
  <div class="icon-grid">
${cells}
  </div>
</section>
</div>`;
};
const sheets = [
  { name: "icons", group: "Icons", title: "Product icons (Figma)", subtitle: `${iconFiles.length} line icons from the Vision AI sandbox, 100-grid, 6px stroke`, body: sheet("Product icons", "", iconFiles, iconSvg, `Monochrome line icons drawn on a 100 grid with a uniform 6px stroke (1.5px at 24px, 3px at 50px). Round caps and joins. One colour: slate on light, white on dark, orange only when the icon is the accent.`, iconSvg("search-gear")) },
  { name: "icons-brand", group: "Icons", title: "Brand icons (brand.trifork.com)", subtitle: `${brandIconFiles.length} official line icons, 40-grid, 1.8px stroke`, body: sheet("Brand icons", "", brandIconFiles, brandIconSvg, `The official icon pack from brand.trifork.com (Dark set, normalised to currentColor). Drawn on a 40 grid with a 1.8px stroke, round caps and joins, occasional small fills. Slightly lighter than the product icons; use them at 24-48px in slides and documents.`, brandIconSvg("strategy")) },
];
for (const s of sheets) {
  write(`components/${s.name}/index.html`, `<!-- @dsCard group="${s.group}" name="${s.title}" subtitle="${s.subtitle}" width="960" -->\n` + page(s.title, s.body));
  cards.push({ name: s.title, path: `components/${s.name}/index.html`, group: s.group, subtitle: s.subtitle, viewport: { width: 960 } });
  stories.push({ name: s.name, title: storyTitle(s.group, s.title), html: s.body, subtitle: s.subtitle });
}

// ---------- 5. storybook stories ----------
for (const s of stories) {
  const esc = s.html.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  write(`stories/generated/${s.name}.stories.js`, `// Generated by scripts/build.mjs from components/src/${s.name}.html. Do not edit.\nexport default { title: ${JSON.stringify(s.title)}, parameters: { layout: "fullscreen", docs: { description: { component: ${JSON.stringify(s.subtitle)} } } } };\nexport const Preview = () => \`${esc}\`;\n`);
}

// ---------- 6. manifest ----------
write("_ds_manifest.json", JSON.stringify({ name: "Trifork Design System", generatedAt: new Date().toISOString(), cards }, null, 2));
console.log(`tokens: ${Object.keys(flat).length} | previews: ${cards.length} | icons: ${iconFiles.length} + ${brandIconFiles.length} brand | stories: ${stories.length} generated`);

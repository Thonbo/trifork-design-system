// Helpers for composing Trifork slides in stories. Markup mirrors tokens/slides.css.
import logo from "../../assets/logo/trifork-logo.svg?raw";

export const LOGO = logo;
export const PHOTO = (n = 1) => `/backgrounds/bokeh-${n}.jpg`;

export const frame = (inner, scale = 0.5) => `<div class="slide-frame" style="--slide-scale:${scale}">${inner}</div>`;

/** Wrap slide content in the canvas with the fixed chrome (label, logo, footer). */
export function slide({ variant = "light", label = "Label", body = "", extraClass = "", style = "", footer = "", logoColor } = {}) {
  const cls = { light: "", dark: "slide--dark", orange: "slide--orange", photo: "slide--photo", white: "slide--white" }[variant] ?? "";
  const photoStyle = variant === "photo" ? `background-image:url('${PHOTO(2)}');` : "";
  return `<div class="slide ${cls} ${extraClass}" style="${photoStyle}${style}">
    ${label ? `<p class="slide__label">${label}</p>` : ""}
    ${body}
    ${footer ? `<div class="slide__footer">${footer}</div>` : ""}
    <div class="slide__logo"${logoColor ? ` style="color:${logoColor}"` : ""}>${LOGO}</div>
  </div>`;
}

export const contentHeader = (title, intro) => `
  <h2 class="s-title slide__title">${title}</h2>
  ${intro ? `<p class="s-body slide__intro">${intro}</p>` : ""}`;

export const bullets = (items, size = "") => `<ul class="s-bullets ${size}">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

export const columns = (cols, numbered = false) => `<div class="s-columns" style="--cols:${cols.length}">${cols
  .map((c, i) => `<div class="s-col">${numbered ? `<p class="s-num">0${i + 1}</p>` : ""}<h3 class="s-subhead">${c.title}</h3><p class="s-body">${c.text}</p></div>`)
  .join("")}</div>`;

export const stats = (items, mode = "row") => {
  const cls = mode === "cards" ? "s-stats s-stats--cards" : mode === "list" ? "s-stats s-stats--list" : "s-stats";
  const num = mode === "cards" ? "s-number s-number--sm" : "s-number";
  const cap = mode === "cards" ? "s-small" : "s-body";
  return `<div class="${cls}" style="--cols:${mode === "list" ? 1 : items.length}">${items
    .map((s) => (mode === "list" ? `<div class="s-stat"><p class="${cap}">${s.label}</p><p class="${num}">${s.value}</p></div>` : `<div class="s-stat"><p class="${num}">${s.value}</p><p class="${cap}">${s.label}</p></div>`))
    .join("")}</div>`;
};

export const people = (list, cols = 4, extra = "") => `<div class="s-people ${extra}" style="--cols:${cols}">${list
  .map((p, i) => `<div class="s-person ${p.span || ""}"><img src="${PHOTO((i % 4) + 1)}" alt=""><p class="s-person__name">${p.name}</p><p class="s-person__role">${p.role}</p></div>`)
  .join("")}</div>`;

export const agenda = (items) => `<div class="s-agenda"><h2 class="s-h2">Agenda</h2><ol class="s-agenda__list">${items
  .map((t, i) => `<li><span class="s-num">${String(i + 1).padStart(2, "0")}</span><span class="s-h5">${t}</span></li>`)
  .join("")}</ol></div>`;

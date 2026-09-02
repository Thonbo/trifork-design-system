import { slide, frame, contentHeader, bullets, columns, stats, people, agenda, LOGO, PHOTO } from "./lib/slide.js";

const variants = ["light", "dark", "orange", "photo"];
const LOREM = "Consectetur eligendi dolorem illo quaerat voluptatibus facilis earum quibusdam sint hic non doloribus ullam ad.";

export default {
  title: "Slides/Slide builder",
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: variants },
    scale: { control: { type: "range", min: 0.25, max: 1, step: 0.05 } },
    label: { control: "text" },
    title: { control: "text" },
    intro: { control: "text" },
  },
  args: { variant: "light", scale: 0.5, label: "Label", title: "Title", intro: LOREM },
};

export const Cover = {
  args: { title: "Presentation title", label: "Label", intro: LOREM, year: "2025", presentationLabel: "Presentation label" },
  render: ({ scale, title, label, intro, year, presentationLabel }) =>
    frame(`<div class="slide s-cover">
      <div class="slide__logo slide__logo--lg">${LOGO}</div>
      <div class="s-cover__text"><p class="s-label">${label}</p><h1 class="s-h1">${title}</h1><p class="s-body-xl" style="color:var(--s-title)">${intro}</p></div>
      <div class="slide__footer slide__footer--lg"><span>${presentationLabel}</span><span class="sep">/</span><span>${year}</span></div>
      <img class="s-cover__image" src="${PHOTO(2)}" alt="">
    </div>`, scale),
};

export const SectionTitle = {
  args: { variant: "dark", title: "Section title", intro: "Double-click to edit" },
  render: ({ variant, scale, label, title, intro }) =>
    frame(slide({ variant, label, extraClass: "slide--centered", style: "align-items:flex-start;text-align:left", body: `<h1 class="s-h0">${title}</h1><p class="s-body-xl" style="margin-top:48px;color:var(--s-title)">${intro}</p>` }), scale),
};

export const Agenda = {
  args: { items: ["Who we are", "The challenge", "Walk the line", "Lab test", "Pilot", "Scale up"] },
  argTypes: { items: { control: "object" } },
  render: ({ variant, scale, label, items }) => frame(slide({ variant, label, body: agenda(items) }), scale),
};

export const Bullets = {
  args: { items: ["Debitis voluptate enim laudantium qui labore unde.", "Error qui eligendi qui et corrupti occaecati qui tenetur totam et iste assumenda cumque.", "In iusto accusamus numquam doloribus eaque pariatur nam aut labore tempore."] },
  argTypes: { items: { control: "object" } },
  render: ({ variant, scale, label, title, intro, items }) => frame(slide({ variant, label, body: `${contentHeader(title, intro)}<div class="slide__body">${bullets(items)}</div>` }), scale),
};

export const Columns = {
  args: { numbered: true, cols: [{ title: "Maxime Velit Expedita", text: LOREM }, { title: "Consequatur Ut Et", text: LOREM }, { title: "Alias Maiores Facere", text: LOREM }] },
  argTypes: { cols: { control: "object" }, numbered: { control: "boolean" } },
  render: ({ variant, scale, label, title, cols, numbered }) => frame(slide({ variant, label, body: `${contentHeader(title)}<div class="slide__body slide__body--end">${columns(cols, numbered)}</div>` }), scale),
};

export const Numbers = {
  args: { mode: "row", items: [{ value: "81%", label: "see significant business potential" }, { value: "5%", label: "have deployed AI to production" }, { value: "15", label: "years of digital collaboration" }, { value: "30", label: "years of digital evolution" }] },
  argTypes: { mode: { control: "select", options: ["row", "cards", "list"] }, items: { control: "object" } },
  render: ({ variant, scale, label, title, intro, items, mode }) => frame(slide({ variant, label, body: `${contentHeader(title, intro)}<div class="slide__body ${mode === "row" ? "slide__body--end" : ""}">${mode === "cards" ? '<p class="s-small s-accent">Important numbers</p>' : ""}${stats(items, mode)}</div>` }), scale),
};

export const Quote = {
  args: { quote: "Trifork is a very important partner for us as they understand the aviation industry.", name: "Thomas Schläpfer", role: "Head of Cabin Crew Technology, Swiss" },
  render: ({ variant, scale, label, quote, name, role }) =>
    frame(slide({ variant, label, extraClass: "slide--bottom", body: `<div class="s-quote" style="margin-bottom:60px"><p class="s-quote__text">${quote}</p><div class="s-quote__author"><img class="s-avatar" src="${PHOTO(2)}" alt=""><div><p class="s-quote__name">${name}</p><p class="s-quote__role">${role}</p></div></div></div>` }), scale),
};

export const Team = {
  args: { layout: "mosaic", team: [{ name: "Full name", role: "Role" }, { name: "Full name", role: "Role" }, { name: "Full name", role: "Role", span: "s-person--tall" }, { name: "Full name", role: "Role" }, { name: "Full name", role: "Role", span: "s-person--wide" }, { name: "Full name", role: "Role" }] },
  argTypes: { layout: { control: "select", options: ["mosaic", "grid-4", "grid-2"] }, team: { control: "object" } },
  render: ({ variant, scale, team, layout }) => {
    const cols = layout === "grid-2" ? 2 : 4;
    const list = layout === "mosaic" ? team : team.map(({ span, ...p }) => p);
    return frame(slide({ variant, label: "", extraClass: "slide--people", body: people(list, cols, layout === "mosaic" ? "s-people--mosaic" : "") }), scale);
  },
};

export const ThankYou = {
  args: { variant: "photo", name: "Full name", role: "Title", email: "mail@trifork.com", phone: "+45 1234 5678" },
  render: ({ variant, scale, name, role, email, phone }) =>
    frame(slide({ variant, label: "", extraClass: "s-closing", body: `<div class="s-closing__text"><h1 class="s-h0">Thank You!</h1><div class="s-closing__contact"><p class="s-label">${role}</p><p class="s-h5" style="color:var(--s-title)">${name}</p><div class="row"><span>${email}</span><span>${phone}</span></div></div></div>` }), scale),
};

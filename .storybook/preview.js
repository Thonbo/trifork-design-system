import "../tokens/fonts.css";
import "../tokens/tokens.css";
import "../tokens/base.css";
import "../tokens/slides.css";

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["Getting started", "Foundations", ["Colors", "Typography", "Spacing & corner radius", "Elevation & backgrounds"], "Icons", "Actions", "Content", "Layout", "Slides", ["Slide builder"]],
      },
    },
    backgrounds: {
      options: {
        page: { name: "Page", value: "#FFFFFF" },
        band: { name: "Light blue band", value: "#D7E4EB" },
        slate: { name: "Slate", value: "#425663" },
        dark: { name: "Brand dark blue", value: "#2C3A42" },
      },
    },
  },
  initialGlobals: { backgrounds: { value: "page" } },
};
export default preview;

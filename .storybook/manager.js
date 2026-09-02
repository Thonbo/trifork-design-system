import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Trifork Design System",
    brandUrl: "https://brand.trifork.com",
    colorPrimary: "#FF6600",
    colorSecondary: "#425663",
    appBg: "#F3F3F3",
    appContentBg: "#FFFFFF",
    appBorderRadius: 12,
    fontBase: '"Poppins", "Segoe UI", sans-serif',
    textColor: "#2C3A42",
    barSelectedColor: "#FF6600",
  }),
});

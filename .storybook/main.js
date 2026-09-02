/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  framework: { name: "@storybook/html-vite", options: {} },
  stories: ["../stories/**/*.stories.js"],
  staticDirs: [{ from: "../assets", to: "/" }],
  core: { disableTelemetry: true },
};
export default config;

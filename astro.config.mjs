// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Hanken Grotesk",
      cssVariable: "--font-hanken-grotesk",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/hanken-grotesk-400.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/hanken-grotesk-500.woff2"],
            weight: 500,
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Recursive",
      cssVariable: "--font-recursive",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/recursive-400.woff2"],
            weight: 400,
            style: "normal",
          },
        ],
      },
    },
  ],
});

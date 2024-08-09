import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://github.com/codiume/orbit/tree/main/packages/astro-purgecss
// If using SSR, purgecss should be tested and configured
import purgecss from "astro-purgecss";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://ecomisto.org",
  integrations: [
    purgecss({
      content: [
        process.cwd() + "/src/**/*.{astro}", // Watching astro and vue sources (for SSR, read the note below)
      ],
    }),
    react(),
    mdx(),
    icon(),
  ],
  devToolbar: {
    enabled: false,
  },
  output: "hybrid",
  adapter: netlify(),
});

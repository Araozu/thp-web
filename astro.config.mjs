import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import remarkCustomThpCompiler from "./src/plugins/thp-code-plugin.ts";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [tailwind(), mdx()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkCustomThpCompiler]
  },
});

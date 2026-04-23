import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

export default defineConfig({
  output: "static",
  site: "https://axiomatic-bi.github.io",
  base: "/axiomatic-bi-showcase",
  integrations: [mdx(), react()]
});

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  output: "static",
  site: "https://axiomatic-bi.github.io",
  base: isGithubActions ? "/axiomatic-bi-showcase" : "/",
  integrations: [mdx(), react()]
});

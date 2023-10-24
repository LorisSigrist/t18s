import { sveltekit } from "@sveltejs/kit/vite";
import { t18s } from "t18s";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    t18s({
      locales: ["en", "de"],
      fallbackLocale: "en",
    }),
  ],
});

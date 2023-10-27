import { sveltekit } from "@sveltejs/kit/vite";
import { t18s } from "t18s";
import { defineConfig } from "vite";
import icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    sveltekit(),
    t18s({
      locales: ["en", "de"],
      fallbackLocale: "en",
      dts:"./$t18s.d.ts"
    }),
    icons({
		compiler: "svelte",
    }),
  ],
  server: {
    fs: {
      allow: ["."],
    }
  }
});

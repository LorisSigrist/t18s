import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx"],
  preprocess: [
    mdsvex({
      smartypants: {
				dashes: 'oldschool'
			},
      rehypePlugins: [
        //@ts-ignore
        [rehypeSlug, undefined],

        [
          // @ts-ignore
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    }),
  ],
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    prerender: {
      entries: ["/", "/404", "/de"],
    },
    typescript: {
      "config": config => {
          config.include.push("../$t18s.d.ts");
      }
    }
  },
};

export default config;

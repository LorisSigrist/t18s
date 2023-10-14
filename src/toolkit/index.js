import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { normalizePath } from "vite";
import MagicString from "magic-string";

const VIRTUAL_MODULE_PREFIX = "virtual:t18s-toolkit:";

/**
 * EXPERIMENTAL Devtools for t18s.
 * @returns {import("vite").Plugin}
 */
export function t18sToolkit() {
  /** @type {import("vite").ResolvedConfig} */
  let config;
  const toolkitPath = getToolkitPath();

  return {
    name: "t18s-toolkit",
    //apply: "serve", // only apply to dev server
    enforce: "pre",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    resolveId(id, _, options) {
      //if (options?.ssr) return;

      if (id.startsWith(VIRTUAL_MODULE_PREFIX)) {
        return id.replace(VIRTUAL_MODULE_PREFIX, toolkitPath);
      }
    },

    async load(id, options) {
      //if (options?.ssr) return;
      if (id.startsWith(toolkitPath)) {
        // read file ourselves to avoid getting shut out by vite's fs.allow check
        const file = cleanUrl(id);
        if (existsSync(id)) {
          try {
            const contents = await readFile(file, "utf-8");
            return contents;
          } catch (e) {
            config.logger.error(`[t18s-toolkit] failed to read file: ${id}`);
          }
        }
      }
    },

    transform(code, id, options) {
      if (options?.ssr) return;
      if (id.includes("vite/dist/client/client.mjs")) {
        const s = new MagicString(code);
        s.append(`\nimport('virtual:t18s-toolkit:index.js');`);
        const map = s.generateMap();

        return {
          code: s.toString(),
          map: map.toString(),
        };
      }
    },
  };
}

function getToolkitPath() {
  const pluginPath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  return pluginPath.replace(
    /\/t18s\/src\/toolkit$/,
    "/t18s/src/toolkit/runtime/",
  );
}

/**
 * @param {string} url
 */
function cleanUrl(url) {
  const postfixRE = /[?#].*$/s;
  return url.replace(postfixRE, "");
}

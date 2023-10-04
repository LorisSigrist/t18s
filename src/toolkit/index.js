import { existsSync } from "fs";
import { readFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { normalizePath } from "vite";

export const VIRTUAL_MODULE_PREFIX = "virtual:t18s-toolkit:";

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
    apply: "serve",
    enforce: "pre",

    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },

    resolveId(id, _, options) {
      if (options?.ssr) return;

      if (id.startsWith(VIRTUAL_MODULE_PREFIX)) {
        return id.replace(VIRTUAL_MODULE_PREFIX, toolkitPath);
      }
    },

    async load(id, options) {
      if (options?.ssr) return;
      if (id.startsWith(toolkitPath)) {
        // read file ourselves to avoid getting shut out by vites fs.allow check
        const file = cleanUrl(id);
        if (existsSync(id)) {
          const contents = await readFile(file, "utf-8");
          return contents;
        } else {
          config.logger.error(`[t18s-toolkit] failed to find file: ${id}`);
        }
      }
    },

    transform(code, id, options) {
      if (options?.ssr) return;
      if (id.includes("vite/dist/client/client.mjs")) {
        return {
          code: `${code}\nimport('virtual:t18s-toolkit:index.js')`,
        };
      }
    },
  };
}

function getToolkitPath() {
  const pluginPath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  return pluginPath.replace(
    /\/t18s\/src\/toolkit$/,
    "/t18s/src/toolkit/runtime/"
  );
}

const postfixRE = /[?#].*$/s;

/**
 * @param {string} url
 */
export function cleanUrl(url) {
  return url.replace(postfixRE, "");
}

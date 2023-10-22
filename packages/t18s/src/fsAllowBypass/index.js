import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizePath } from "vite";

function getT18SModulePath() {
  const thisModulePath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  const t18sModulePath = resolve(thisModulePath, "../..");
  return t18sModulePath;
}

/**
 * Bypass vite's `fs.allow` check for files inside the `t18s` package.
 * @returns { import("vite").Plugin}
 */
export function fsAllowBypass() {
  const t18sModulePath = getT18SModulePath();

  return {
    name: "t18s:fsAllowBypass",
    enforce: "pre",
    resolveId(unresolved_id) {
      if (!unresolved_id.startsWith(t18sModulePath)) return null;
      return unresolved_id;
    },

    async load(resolved_id) {
      if (!resolved_id.startsWith(t18sModulePath)) return null;

      //Manually read the file content to bypass vite's fs.allow check
      if (existsSync(resolved_id)) {
        try {
          return readFile(resolved_id, "utf-8");
        } catch (e) {
          console.error(`[t18s-internal] failed to read file: ${resolved_id}`);
        }
      }
      return null;
    },
  };
}

import { readFile } from "fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizePath } from "vite";
import { VIRTUAL_MODULE_PREFIX } from "../constants.js";

function getT18SModulePath() {
  const thisModulePath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  const $t18sMainModulePath = resolve(thisModulePath, "../runtime/index.js");
  return $t18sMainModulePath;
}

const $t18sMainModulePath = getT18SModulePath();

/**
 * @param {string} unresolved_id 
 * @returns {string | null}
 */
export function resolveMainModuleId(unresolved_id) {
  if (unresolved_id === VIRTUAL_MODULE_PREFIX) return $t18sMainModulePath;
  return null;
}

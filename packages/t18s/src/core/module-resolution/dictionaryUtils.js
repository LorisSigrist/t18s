import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizePath } from "vite";

function getDictionaryUtilsModulePath() {
  const thisModulePath = normalizePath(dirname(fileURLToPath(import.meta.url)));
  const $t18sMainModulePath = resolve(thisModulePath, "../runtime/dictionaryUtils.js");
  return $t18sMainModulePath;
}

const modulePath = getDictionaryUtilsModulePath();

/** @type {import("./types.js").IDResolver} */
export const resolveDictionaryUtilsModuleId = (unresolved_id) => {
  if (unresolved_id === "t18s-internal:dictionary-utils") return modulePath;
  return null;
};

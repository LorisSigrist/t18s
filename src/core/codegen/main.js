import { readFile } from "fs/promises";
import { MessageCatalogue } from "../MessageCatalogue.js";

const code = await readFile(new URL("./main/index.js", import.meta.url), {
  encoding: "utf-8",
});

/**
 * Generates the code for the "$t18s" module
 * @returns {string}
 */
export function generateMainModuleCode() {
  return code;
}

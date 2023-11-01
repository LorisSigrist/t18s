import { MessageCatalogue } from "../MessageCatalogue.js";
import { Tree } from "../utils/Tree.js";
import { Message } from "../Message.js";

/** @type {import("./types.js").IDResolver} */
export const resolveDictionaryModuleId = (unresolved_id) => {
  if (!unresolved_id.startsWith("t18s-internal:dictionary:")) return null;
  return "\0" + unresolved_id;
};

/** @type {import("./types.js").ModuleLoader} */
export const loadDictionaryModule = async (resolved_id, config, Catalogue) => {
  if (!resolved_id.startsWith("\0t18s-internal:dictionary:")) return null;
  const { domain, path } = parseDictionaryModuleId(resolved_id);
  return generateDictionaryModuleCode(Catalogue, domain, path);
};

/**
 * @param {string} resolved_id 
 * @returns {{ domain: string, path: string[] }}
 */
export function parseDictionaryModuleId(resolved_id) {
  let [_, __, domain, pathString, extra] = resolved_id.split(":");
  if (extra) throw new Error("Invalid dictionary module ID");
  domain = domain ?? "";
  pathString = pathString ?? "";
  const path = pathString.split("/").filter(Boolean) ?? [];

  return { domain, path }
}

/**
 * @param {MessageCatalogue} Catalogue
 * @param {string} domain
 * @param {string[]} path
 * @returns {string}
 */
function generateDictionaryModuleCode(Catalogue, domain, path) {
  let code = "";
  code += 'import { format } from "t18s-internal:dictionary-utils";\n\n'

  /** @type {Tree<Message>[]} */
  const dictionaries = [];

  for (const [locale, dictionary] of Catalogue.getMessages(domain)) {
    dictionaries.push(dictionary);
  }

  const tree = Tree.mergeTrees(dictionaries);
  const subtree = tree.getPath(path);
  if (!(subtree instanceof Tree)) {
    return "export {}";
  }

  for (const [key, child] of subtree.children()) {
    if (child instanceof Tree) {
      const newPath = [...path, key];
      const submoduleID = `t18s-internal:dictionary:${domain}:` + newPath.join("/");
      code += `export * as ${key} from "${submoduleID}";\n`;
    } else {
      code += `export const ${key} = /* @__PURE__ */ (values = undefined) => {
          const messages = {
              ${[...child]
                .map(
                  (message) =>
                    `"${message.locale}": ${message.precompiled}`
                )
                .join(",\n")}
          };

          return format("${key}", messages, values);
      }\n`;
    }
  }

  return code;
}

/**
 * Resolves the public message module id to the internal dictionary module id.
 * @param {*} unresolved_id
 */
export function resolveMessageModuleId(unresolved_id) {
  if (!unresolved_id.startsWith("$t18s/messages")) return null;
  let [_, __, domain] = unresolved_id.split("/");
  domain = domain ?? "";

  return `\0t18s-internal:dictionary:${domain}`;
}

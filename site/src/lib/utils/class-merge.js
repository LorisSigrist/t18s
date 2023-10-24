/**
 * Merges classes together & ignores any falsy values
 *
 * @param  {(string | false | null)[]} classes
 * @returns
 */
export const merge = (...classes) => classes.filter(Boolean).join(" ");

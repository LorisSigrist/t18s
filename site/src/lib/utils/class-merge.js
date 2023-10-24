/**
 * Merges classes together & ignores any falsy values
 * @param  {(string | false | null)[]} classes 
 * @returns 
 */
export function merge(...classes) {
    return classes.filter(Boolean).join(' ');
}
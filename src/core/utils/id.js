/**
 * Removes any query string or hash values from a url.
 * @param {string} url
 * @returns {string}
 */
export function cleanUrl(url) {
  const postfixRE = /[?#].*$/s;
  return url.replace(postfixRE, "");
}

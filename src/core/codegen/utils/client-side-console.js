/** @param {string} msg */
export function debug(msg) {
  return `console.debug("${formatMessage(msg)}")`;
}

/** @param {string} msg */
export function log(msg) {
  return `console.log("${formatMessage(msg)}")`;
}

/** @param {string} msg */
export function warn(msg) {
  return `console.warn("${formatMessage(msg)}")`;
}

/** @param {string} msg */
export function error(msg) {
  return `console.error("${formatMessage(msg)}")`;
}

/** @param {string} msg */
function formatMessage(msg) {
  return "[t18s] " + msg;
}

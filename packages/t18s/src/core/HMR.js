/**
 * @typedef {{
 *  "t18s:removeDictionary": { locale: string, domain: string }
 *  "t18s:reloadDictionary": { locale: string, domain: string },
 *  "t18s:removeDomain" : { domain: string },
 *  "t18s:invalidateDomain": { domain: string },
 * }} HMREventMap
 */

/**
 * @typedef {<E extends keyof HMREventMap>(event: E, data: HMREventMap[E]) => void} HMREventDispatcher
 */

/**
 * Creates an HMR event dispatcher function using the given Vite dev server.
 * @param {import("vite").ViteDevServer} viteDevServer
 * @returns {HMREventDispatcher}
 */
export function createHMRDispatcher(viteDevServer) {
  return (event, data) => {
    viteDevServer.ws.send({
      type: "custom",
      event,
      data,
    });
  };
}

/**
 * @typedef {{
 *  "t18s:createLocale":     { locale: string }
 *  "t18s:removeLocale":     { locale: string }
 *  "t18s:invalidateLocale": { locale: string }
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

import { focusTrap } from "svelte-focus-trap";

/**
 * @param {HTMLElement} node
 * @param {boolean} initialTrapActive
 */
export function conditionalFocusTrap(node, initialTrapActive) {
  /** @type {(()=>void) | null}*/
  let destroy = null;

  /**@param {boolean} active*/
  function update(active) {
    if (active) {
      //@ts-ignore - It does have a destroy method, the type is just wrong
      const { destroy: _destroy } = focusTrap(node);
      destroy = _destroy;
    } else {
      if (destroy) destroy();
      destroy = null;
    }
  }

  update(initialTrapActive);

  return {
    update,
    destroy() {
      if (destroy) destroy();
      destroy = null;
    },
  };
}

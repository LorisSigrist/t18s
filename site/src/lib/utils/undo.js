import { writable } from "svelte/store";

/**
 * @param {string} initialValue
 * @returns {import("svelte/store").Writable<string> & {undo: () => void, redo: () => void}}
 */
export function undoable(initialValue) {
  const history = [initialValue];
  let index = 0;

  const { subscribe, set: setValueStore, update: updateValueStore } = writable(initialValue);

  const undo = () => {
    const previousValue = history[index - 1];
    if (previousValue !== undefined) {
      index -= 1;
      setValueStore(previousValue);
    }
  };

  const redo = () => {
    const nextValue = history[index + 1];
    if (nextValue !== undefined) {
      index += 1;
      setValueStore(nextValue);
    }
  };

  /**
   * @param {string} value
   */
  const set = (value) => {
    if (value !== history[index]) {
      history.splice(index + 1, history.length - index, value);
      index = history.length - 1;
      setValueStore(value);
    }
  };

  /**
   * @param {Parameters<(typeof updateValueStore)>[0]} fn
   */
  const update = (fn) => {
    updateValueStore((value) => {
      const newValue = fn(value);
      set(newValue);
      return newValue;
    });
  };

  return {
    subscribe,
    set,
    update,
    undo,
    redo,
  };
}

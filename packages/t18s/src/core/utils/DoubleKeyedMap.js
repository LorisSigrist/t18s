/**
 * @template T
 *
 */
export class DoubleKeyedMap {
  /**
   * @type {Map<string, Map<string, T>>}
   */
  #outer = new Map();

  /**
   * @param {string} key1
   * @param {string} key2
   * @param {T} value
   */
  set(key1, key2, value) {
    let inner = this.#outer.get(key1);
    if (!inner) {
      inner = new Map();
      this.#outer.set(key1, inner);
    }

    inner.set(key2, value);
  }

  /**
   * @param {string} key1
   * @param {string} key2
   * @returns {T|undefined} value
   */
  get(key1, key2) {
    const inner = this.#outer.get(key1);
    if (!inner) return undefined;
    return inner.get(key2);
  }

  /**
   * @param {string} outerKey
   * @returns {Map<string, T>} value
   */
  getInner(outerKey) {
    return this.#outer.get(outerKey) ?? new Map();
  }

  outerKeys() {
    return this.#outer.keys();
  }

  /**
   * @param {string} key1
   * @param {string} key2
   * @returns {boolean}
   */
  has(key1, key2) {
    const inner = this.#outer.get(key1);
    if (!inner) return false;
    return inner.has(key2);
  }

  /**
   * @param {string} key1
   * @param {string} key2
   */
  delete(key1, key2) {
    const inner = this.#outer.get(key1);
    if (!inner) return;
    inner.delete(key2);
  }

  entries() {
    /** @type {Set<[string, string, T]>} */
    const entries = new Set();
    for (const [key1, inner] of this.#outer) {
      for (const [key2, value] of inner.entries()) {
        entries.add([key1, key2, value]);
      }
    }
    return entries[Symbol.iterator]();
  }

  keys() {
    /** @type {Set<[string,string]>} */
    const keys = new Set();
    for (const [key1, inner] of this.#outer) {
      for (const [key2, value] of inner.entries()) {
        keys.add([key1, key2]);
      }
    }
    return keys[Symbol.iterator]();
  }
}

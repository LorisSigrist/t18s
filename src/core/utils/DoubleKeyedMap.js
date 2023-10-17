
/**
 * @template T
 * 
 */
export class DoubleKeyedMap {
    /** 
     * @type {Map<string, Map<string, T>>}
     */
    #map = new Map();

    /**
     * @param {string} key1
     * @param {string} key2
     * @param {T} value
     */
    set(key1, key2, value) {
        let inner = this.#map.get(key1);
        if (!inner) {
            inner = new Map();
            this.#map.set(key1, inner);
        }

        inner.set(key2, value);
    }

    /**
     * @param {string} key1
     * @param {string} key2
     * @returns {T|undefined} value
     */
    get(key1, key2) {
        const inner = this.#map.get(key1);
        if (!inner) return undefined;
        return inner.get(key2);
    }

    /**
     * @param {string} key1
     * @param {string} key2
     * @returns {boolean}
     */
    has(key1, key2) {
        const inner = this.#map.get(key1);
        if (!inner) return false;
        return inner.has(key2);
    }

    /**
     * @param {string} key1
     * @param {string} key2
     */
    delete(key1, key2) {
        const inner = this.#map.get(key1);
        if (!inner) return;
        inner.delete(key2);
    }

    /**
     * @returns {Iterable<[string, string]>}
     */
    keys() {
        /** @type {[string, string][]} */
        const keys = [];
        for (const [key1, inner] of this.#map) {
            for (const key2 of inner.keys()) {
                keys.push([key1, key2]);
            }
        }
        return keys;
    }

    entries() {
        /** @type {Set<[string, string, T]>} */
        const entries = new Set();
        for (const [key1, inner] of this.#map) {
            for (const [key2, value] of inner.entries()) {
                entries.add([key1, key2, value]);
            }
        }
        return entries[Symbol.iterator]();
    }
}
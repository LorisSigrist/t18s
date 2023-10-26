/**
 * @template T
 * @param {Record<string, Record<string, T>>} outer
 * @returns {(key1: string, key2: string) => (T | undefined)}
 */
export function doubleKeyedGetter(outer) {
  return (key1, key2) => {
    const inner = outer[key1];
    if (!inner) return undefined;
    return inner[key2];
  };
}

/**
 * @template T
 * @param {Record<string, Record<string, T>>} outer
 * @returns {(key1: string, key2: string, value: T) => void}
 *
 */
export function doubleKeyedSetter(outer) {
  return (key1, key2, value) => {
    const inner = outer[key1];
    if (!inner) outer[key1] = { [key2]: value };
    else inner[key2] = value;
  };
}

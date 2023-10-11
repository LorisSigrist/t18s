/**
 * @template SuccessType
 * @typedef {{ result: SuccessType, error: undefined } | { result: undefined, error: Error }} Result
 */

/**
 * Returns a Safe Version of the given function.
 *
 * @template {(...args:any[]) => any} FUNC
 * @param {FUNC} unsafeFunc
 * @returns {(...args: Parameters<FUNC>) => Result<ReturnType<FUNC>>}
 */
export function safe(unsafeFunc) {
  return function (...args) {
    try {
      const result = unsafeFunc(...args);
      return { result };
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      return { error, result: undefined };
    }
  };
}
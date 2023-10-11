/**
 * Returns a Safe Version of the given function.
 *
 * @template {(...args:any[]) => any} FUNC
 * @param {FUNC} unsafeFunc
 * @returns {(...args: Parameters<FUNC>) => { result: ReturnType<FUNC>, error: undefined } | { result: undefined, error: Error }}
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
/**
 * Await a promise and save the result & errors so that they can be synchronously replayed later.
 * 
 * @template {any} T
 * @param {T} promise 
 * 
 * @returns {Promise<()=> Awaited<T>>}
 */
export async function buffer(promise) {
    /** @type {Awaited<T>} */
    let resolvedWith;

    /** @type {unknown} */
    let rejectedWith;
    let rejected = false;


    try {
        resolvedWith = await promise;
    } catch (e) {
        rejectedWith = e;
        rejected = true;
    }

    return () => {
        if (rejected) throw rejectedWith;
        return resolvedWith;
    }
}
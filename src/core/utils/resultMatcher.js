/**
 * The configuration for a ResultMatcher Strategy.
 *
 * @template Prototype
 * @template ReturnType
 * @typedef {{
 *    prototype: { new (): Prototype;  } | { prototype: Prototype; },
 *    handler: (instance: Prototype) => ReturnType;
 * }} Strategy
 */

/**
 * Declaratively define a series of Error-Handling strategies for a given function.
 * Think of this as a `match` statement for errors.
 *
 * This follows an immutable builder pattern, so each method returns a new instance of the ResultMatcher class.
 *
 * @template {(...args: any) => any} UnsafeFunc
 * @template {(result: ReturnType<UnsafeFunc>) => any} SuccessHandler
 * @template {Strategy<any, any>[]} [Strategies=[]]
 */
export class ResultMatcher {
  /** @type {UnsafeFunc} */
  #unsafeFunction;

  /** @type {Strategies} */
  #strategies;

  /** @type {SuccessHandler | null} */
  #successHandler = null;

  /**
   * @param {UnsafeFunc} func
   * @param {Strategies} strategies
   * @param {SuccessHandler | null} successHandler
   */
  constructor(
    func,
    strategies = /** @type {any} */ ([]),
    successHandler = null
  ) {
    this.#unsafeFunction = func;
    this.#strategies = strategies;
    this.#successHandler = successHandler;
  }

  /**
   * Defines a strategy for a given error type.
   * 
   * @template Prototype 
   * @template StrategyReturnType
   *
   * @param {{ new (): Prototype;} | { prototype: Prototype; }} prototype - The error type to handle. Thrown things will be compared against this with `instanceof`.
   * @param {(instance: Prototype) => StrategyReturnType} handler - Callback to handle the error.
   * @returns {ResultMatcher<UnsafeFunc, SuccessHandler, [...Strategies, Strategy<Prototype, StrategyReturnType>]>}
   */
  rescue(prototype, handler) {
    const registeredStrategy = { prototype, handler };
    return new ResultMatcher(this.#unsafeFunction, [
      ...this.#strategies,
      registeredStrategy,
    ]);
  }

  /**
   * Handle the happy path
   * 
   * @template {SuccessHandler} Handler
   * @param {Handler} handler
   * @returns {ResultMatcher<UnsafeFunc, Handler, Strategies>}
   */
  success(handler) {
    return new ResultMatcher(this.#unsafeFunction, this.#strategies, handler);
  }

  /**
   * Calls the unsafe function with the given parameters and handles any errors that may be thrown 
   * according to the registered strategies.
   * 
   * @param  {Parameters<UnsafeFunc>} params
   * @returns { ReturnType<SuccessHandler> | ReturnType<Strategies[number]["handler"]>}
   */
  call(...params) {
    let successResult;
    try {
      // @ts-ignore
      successResult = this.#unsafeFunction(...params);
    } catch (e) {
      for (const strategy of this.#strategies) {
        if (e instanceof /** @type {any} */ (strategy.prototype)) {
          return strategy.handler(e);
        }
      }
      throw e;
    }

    if (this.#successHandler) {
      return this.#successHandler(successResult);
    }

    return successResult;
  }
}

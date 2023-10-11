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
 * Declaratively define what should happen for all the possible outcomes of a function.
 * This follows an immutable builder pattern, so each method returns a new instance of the ResultMatcher class.
 *
 * @template {(...args: any) => any} UnsafeFunc
 * @template {(result: ReturnType<UnsafeFunc>) => any} SuccessHandler
 * @template {Strategy<any, any>[]} [Strategies=[]]
 * @template {((e: unknown) => any) | null} [FallbackHandler=null]
 */
export class ResultMatcher {
  /** @type {UnsafeFunc} */
  #unsafeFunction;

  /** @type {Strategies} */
  #strategies;

  /** @type {SuccessHandler | null} */
  #successHandler = null;

  /** @type {FallbackHandler} */
  #fallbackHandler;

  /**
   * @param {UnsafeFunc} func
   * @param {Strategies} strategies
   * @param {SuccessHandler | null} successHandler
   * @param {FallbackHandler} fallbackHandler
   */
  constructor(
    func,
    strategies = /** @type {any} */ ([]),
    successHandler = null,
    fallbackHandler = /** @type {any} */ (null)
  ) {
    this.#unsafeFunction = func;
    this.#strategies = strategies;
    this.#successHandler = successHandler;
    this.#fallbackHandler = fallbackHandler;
  }

  /**
   * Defines a strategy for a given error type.
   *
   * @template Prototype
   * @template StrategyReturnType
   *
   * @param {{ new (): Prototype;} | { prototype: Prototype; }} prototype - The error type to handle. Thrown things will be compared against this with `instanceof`.
   * @param {(instance: Prototype) => StrategyReturnType} handler - Callback to handle the error.
   * @returns {ResultMatcher<UnsafeFunc, SuccessHandler, [...Strategies, Strategy<Prototype, StrategyReturnType>], FallbackHandler>}
   */
  rescue(prototype, handler) {
    const registeredStrategy = { prototype, handler };
    return new ResultMatcher(
      this.#unsafeFunction,
      [...this.#strategies, registeredStrategy],
      this.#successHandler,
      this.#fallbackHandler
    );
  }

  /**
   * @template {(e:unknown) => any} Handler
   * 
   * @param {Handler} handler 
   * @returns {ResultMatcher<UnsafeFunc, SuccessHandler, Strategies, Handler>}
   */
  rescueAll(handler) {
    return new ResultMatcher(this.#unsafeFunction, this.#strategies, this.#successHandler, handler);
  }

  /**
   * Handle the happy path
   *
   * @template {SuccessHandler} Handler
   * @param {Handler} handler
   * @returns {ResultMatcher<UnsafeFunc, Handler, Strategies, FallbackHandler>}
   */
  success(handler) {
    return new ResultMatcher(this.#unsafeFunction, this.#strategies, handler, this.#fallbackHandler);
  }

  /**
   * Calls the unsafe function with the given parameters and handles any errors that may be thrown
   * according to the registered strategies.
   *
   * @param  {Parameters<UnsafeFunc>} params
   * @returns {FallbackHandler extends null ? (ReturnType<SuccessHandler> | ReturnType<Strategies[number]["handler"]>) : (ReturnType<SuccessHandler> | ReturnType<Strategies[number]["handler"]>) | ReturnType<FallbackHandler> }
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

      if (this.#fallbackHandler) {
        return this.#fallbackHandler(e);
      }
      
      throw e;
    }

    if (this.#successHandler) {
      return this.#successHandler(successResult);
    }

    return successResult;
  }
}

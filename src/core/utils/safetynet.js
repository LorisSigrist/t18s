/**
 * The configuration for a SafetyNet Strategy.
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
 * This follows an immutable builder pattern, so each method returns a new instance of the SafetyNet class.
 *
 * @template {(...args: any) => any} UnsafeFunc
 * @template {any} [SuccessReturnType=void]
 * @template {Strategy<any, any>[]} [Strategies=[]]
 */
export class SafetyNet {
  /** @type {UnsafeFunc} */
  #unsafeFunction;

  /** @type {Strategies} */
  #strategies;

  /** @type {((result: ReturnType<UnsafeFunc>) => SuccessReturnType )| null} */
  #successHandler = null;

  /**
   * @param {UnsafeFunc} func
   * @param {Strategies} strategies
   * @param {((result: ReturnType<UnsafeFunc>) => SuccessReturnType )| null} successHandler
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
   * @template Prototype
   * @template StrategyReturnType
   *
   * @param {{ new (): Prototype;} | { prototype: Prototype; }} prototype
   * @param {(instance: Prototype) => StrategyReturnType} handler
   * @returns {SafetyNet<UnsafeFunc, SuccessReturnType, [...Strategies, Strategy<Prototype, StrategyReturnType>]>}
   */
  rescue(prototype, handler) {
    const registeredStrategy = { prototype, handler };
    return new SafetyNet(this.#unsafeFunction, [
      ...this.#strategies,
      registeredStrategy,
    ]);
  }

  /**
   * @template Return
   * @param {(result: ReturnType<UnsafeFunc>) => Return} handler
   * @returns {SafetyNet<UnsafeFunc, Return, Strategies>}
   */
  success(handler) {
    return new SafetyNet(this.#unsafeFunction, this.#strategies, handler);
  }

  /**
   * @param  {Parameters<UnsafeFunc>} params
   * @returns { SuccessReturnType | ReturnType<Strategies[number]["handler"]>}
   */
  call(...params) {
    let successResult;
    try {
      successResult = this.#unsafeFunction(params);
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

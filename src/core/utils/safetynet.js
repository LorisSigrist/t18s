/**
 * Declaratively define a series of Error-Handling strategies for a given function.
 * Think of this as a `match` statement for errors.
 *
 * This follows an immutable builder pattern, so each method returns a new instance of the SafetyNet class.
 */
export class SafetyNet {

    constructor(func, strategies = []) {
        this.func = func;
        this.strategies = strategies;
    }
    rescue(prototype, handler) {
        const registeredStrategy = { prototype, handler };
        return new SafetyNet(this.func, [...this.strategies, registeredStrategy]);
    }

    success(handler) {
        this.successHandler = handler;
        return this;
    }

    call(...params) {
        let successResult;
        try {
            successResult = this.func(params);
        }
        catch (e) {
            for (const strategy of this.strategies) {
                if (e instanceof strategy.prototype) {
                    return strategy.handler(e);
                }
            }
            throw e;
        }

        if (this.successHandler) {
            return this.successHandler(successResult);
        }
    }
}

type Strategy<P, R> = {
    prototype: {
        new (): P;
    } | {
        prototype: P;
    };
    handler: (instance: P) => R;
};
/**
 * Declaratively define a series of Error-Handling strategies for a given function.
 * Think of this as a `match` statement for errors.
 *
 * This follows an immutable builder pattern, so each method returns a new instance of the SafetyNet class.
 */
export declare class SafetyNet<Func extends (...args: any) => any, SuccessReturnType = void, Strategies extends Strategy<any, any>[] = []> {
    private readonly func;
    private readonly strategies;
    constructor(func: Func, strategies?: Strategies);
    
    rescue<P, R>(prototype: {
        new (): P;
    } | {
        prototype: P;
    }, handler: (instance: P) => R): SafetyNet<Func, SuccessReturnType, [...Strategies, Strategy<P, R>]>;

    success<R>(handler: (result: ReturnType<Func>) => R):  SafetyNet<Func, R, Strategies>;
    call(...params: Parameters<Func>): SuccessReturnType | ReturnType<Strategies[number]["handler"]>;
}
export {};
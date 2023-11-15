
class Success<V>{
    public constructor(public value: V) { }
}

class Err<V>{
    public constructor(public value: V) { }
}

export class Either<E, S> {
    private constructor(private _e: Err<E>, private _s: Success<S>) { }

    public get error() {
        return this._e.value;
    }

    public get success() {
        return this._s.value;
    }

    public static error<T>(e: T) {
        return new Either<T, never>(new Err<T>(e), undefined as any);
    }

    public static success<T>(e: T) {
        return new Either<never, T>(undefined as any, new Success<T>(e));
    }

    public static isError<T>(either: any): either is Either<T, never> {
        return either instanceof Err;
    }

    public static isSuccess<T>(either: any): either is Either<never, T> {
        return either instanceof Success;
    }

    public isError(): this is Either<NonNullable<E>, never> {
        return this._e instanceof Err;
    }

    public isSuccess(): this is Either<never, NonNullable<S>> {
        return this._s instanceof Success;
    }
}
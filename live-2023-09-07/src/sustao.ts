import {useSyncExternalStoreWithSelector} from "use-sync-external-store/shim/with-selector";

type Sub<T> = (state: T, prev: T) => void;

type StateCreator<State> = (setState: Sub<State>, getState: () => State, api: any) => State;

type SetStateInternal<T> = {
    _(partial: T | Partial<T> | { _(state: T): T | Partial<T> }["_"]): void;
}["_"];

export type StoreApi<T> = {
    destroy: () => void;
    getState: () => T;
    setState: SetStateInternal<T>;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
};

export const createStore = <State>(store: StateCreator<State>): StoreApi<State> => {
    const subscribers = new Set<Sub<State>>();
    let currentState: any;
    const setState = (setterOrNewState: State) => {
        const isFunctionStatement = typeof setterOrNewState === "function";
        const next = isFunctionStatement ? setterOrNewState(currentState) : setterOrNewState;
        if (Object.is(next, currentState)) return;
        const prev = currentState;
        currentState = typeof next !== "object" ? next : Object.assign({}, currentState, next);
        subscribers.forEach((sub) => sub(currentState, prev));
    };
    const getState = () => currentState;
    const destroy = () => subscribers.clear();
    const subscribe = (sub: Sub<State>) => {
        subscribers.add(sub);
        return () => subscribers.delete(sub);
    };
    const api: StoreApi<State> = {setState, getState, subscribe, destroy};
    currentState = store(setState, getState, api);
    return api;
};

const useInternalStore = <T>(api: StoreApi<T>, selector: (a: any) => any) =>
    useSyncExternalStoreWithSelector(api.subscribe, api.getState, api.getState, selector, Object.is);

type Setup<InitialStateOrFunction> =
    /*
        Se o generics 'T' extende uma função que retorne 'R', faça
            if retorne uma função que possa receber:
                - um objeto
                - uma função que receba um callback que retorne 'R'
               essa função deverá retornar 'R'
     */
    InitialStateOrFunction extends (a: any) => infer State ?
        (a: ((prev: State) => State) |
            ((fn: (prev: State) => State) => State)) => State
       : InitialStateOrFunction;

export const create = <T extends object | ((v: (arg: any) => any) => any)>(state: Setup<T>) => {
    const api = typeof state === "function" ? createStore(state as any) : state;

    function defaultSelector(state: T) {
        return state;
    }

    const useStore = <V>(selector?: () => V): T extends (a: any) => infer R ? R : T =>
        useInternalStore(api as StoreApi<T>, selector || defaultSelector) as any;
    Object.assign(useStore, api);
    return useStore;
};

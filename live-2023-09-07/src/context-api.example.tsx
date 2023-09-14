import React, {createContext, useContext, useState} from "react";

type State = {
    name: string;
    text: string;
}

type GlobalState = [state: State, set: (state: State | ((prev: State) => State)) => void];

const context = createContext<GlobalState | undefined>(undefined);

const useGlobalState = () => {
    const ctx = useContext(context);
    if (ctx === undefined) throw new Error("Context Empty");
    return ctx;
}

const GlobalState = (props: React.PropsWithChildren) => (
    <context.Provider value={useState<State>({name: "", text: ""})}>
        {props.children}
    </context.Provider>
)

const NameComponent = () => {
    const [state, setState] = useGlobalState();
    return <div>
        <input value={state.name} onChange={e => setState(prev => ({...prev, name: e.target.value}))}/>
    </div>
}

const TextComponent = () => {
    const [state, setState] = useGlobalState();
    return <div>
        <input value={state.text} onChange={e => setState(prev => ({...prev, text: e.target.value}))}/>
    </div>
}

const NameView = () => {
    const [state] = useGlobalState();
    return <p>{state.name}</p>
}

const TextView = () => {
    const [state] = useGlobalState();

    return <p>{state.text}</p>
}

export default function ContextApiExample() {
    return <GlobalState>
        <div style={{display: "flex", gap: "1rem"}}>
            <NameComponent/>
            <TextComponent/>
        </div>
        <div style={{display: "flex", gap: "1rem"}}>
            <NameView/>
            <TextView/>
        </div>
    </GlobalState>
}
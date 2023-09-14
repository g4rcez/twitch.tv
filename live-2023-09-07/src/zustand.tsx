import React, {useCallback} from "react";
import {create} from "zustand"

type State = {
    name: string;
    text: string
    setName: (str: string) => void
    setText: (str: string) => void
}

const useGlobalState = create<State>(setter => ({
    name: "name",
    text: "text",
    setName: (newName: string) => setter(() => ({name: newName})),
    setText: (newText: string) => setter(() => ({text: newText}))
}));


const NameComponent = () => {
    const [name, setName] = useGlobalState(state => [state.name, state.setName]);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), [])
    return <input value={name} onChange={onChange}/>
}

const TextComponent = () => {
    const [text, setText] = useGlobalState(state => [state.text, state.setText]);
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value), [])
    return <input value={text} onChange={onChange}/>
}


const NameView = () => {
    const name = useGlobalState(state => (state.name));
    return <p>{name}</p>
}

const TextView = () => {
    const text = useGlobalState(state => (state.text));
    return <p>{text}</p>
}


export default function ZustandExample() {
    return <div>
        <div style={{display: "flex", gap: "1rem"}}>
            <NameComponent/>
            <TextComponent/>
        </div>
        <div style={{display: "flex", gap: "1rem"}}>
            <NameView/>
            <TextView/>
        </div>
    </div>
}
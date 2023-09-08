import React, { useEffect } from "react";
import { useReducer } from "use-typed-reducer";

const initialState = { name: "", date: new Date(), id: "", count: 0 };

type Props = {
    id: string;
};

export default function UseReducerComponent(props: Props) {
    const [state, dispatcher] = useReducer(
        initialState,
        (getState, getProps, init) => ({
            reset: () => init,
            update: (e: React.MouseEvent<HTMLButtonElement>) => {
                const name = e.currentTarget.dataset.name;
                return { name, id: getProps().id, count: getState().count + 1 };
            },
        }),
        props,
        [
            (state) => {
                console.log("MIDDLEWARE", state);
                localStorage.setItem("session", JSON.stringify(state));
                return state;
            },
        ],
    );

    useEffect(() => {
        console.log("UPDATE", state.date);
    }, [state.date]);

    return (
        <div>
            <button onClick={dispatcher.reset}>Reset</button>
            <button data-name={Math.random().toString(36)} onClick={dispatcher.update}>
                Update state
            </button>
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </div>
    );
}

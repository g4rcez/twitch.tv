
const initialState = { name: "" };

const useState = <T,>(initialState: T) => {
    return useReducer((previousState: T, action: T | ((prev: T) => T)) => {
        if (typeof action === "function") return (action as Function)(previousState);
        return action;
    }, initialState);
};

export default function UseReducerComponent() {
    const [state, setState] = useState(initialState);

    return (
        <div>
            <button onClick={() => setState({ name: " " })}>Clear state</button>
            <button onClick={() => setState((prev) => ({ ...prev, name: "Fulano" }))}>Update State</button>
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </div>
    );
}

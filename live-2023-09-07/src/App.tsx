import {create} from "./sustao.ts";

const useStore = create((set) => ({
    count: 0,
    setCount: () => set((prev) => ({...prev, count: prev.count + 1})),
}));

const TestGlobal = () => {
    const state = useStore();
    return <div>{state.count}</div>;
};

const Setter = () => {
    const state = useStore();
    return <div className="card">
        <button onClick={state.setCount}>count is {state.count}</button>
    </div>

}

function App() {
    return (
        <>
            <Setter/>
            <TestGlobal/>
        </>
    );
}

export default App;

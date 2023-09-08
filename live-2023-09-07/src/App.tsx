import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import { create } from "./sustao.ts";

const useStore = create((set) => ({
    count: 0,
    setCount: () => set((prev) => ({ ...prev, count: prev.count + 1 })),
}));

const TestGlobal = () => {
    const state = useStore();
    return <div>{state.count}</div>;
};

function App() {
    const state = useStore();
    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={state.setCount}>count is {state.count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
            <TestGlobal />
        </>
    );
}

export default App;

import { useEffect, useState } from "react";

const user = { name: "Fulano", age: 20, id: "612911c3-f17c-4254-bb3b-da34a416c334" };

export default function UseStateComponent() {
    const [state, setState] = useState(user);
    const [_count, setCount] = useState(1);

    useEffect(() => {
        console.log(state);
        setCount((prev) => prev + 1);
    }, [state.id]);

    return (
        <div>
            <button onClick={() => setState({ ...user, age: Math.random() })}>Update user</button>
            <pre>
                <code>{JSON.stringify(state)}</code>
            </pre>
        </div>
    );
}

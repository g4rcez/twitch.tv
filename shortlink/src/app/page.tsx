"use client";
import React, {useState} from "react";
import type {Shortlink} from "~/database/shortlink"

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) =>
    <input {...props} className={`border p-2 border-slate-400 rounded-md ${props.className ?? ""}`}/>

type State = null | Shortlink.Shape;

export default function Home() {
    const [state, setState] = useState<State>(null);
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const elements = form.elements;
        const json = {
            name: (elements.namedItem("name") as HTMLInputElement).value,
            url: (elements.namedItem("url") as HTMLInputElement).value,
        };
        try {
            const response = await fetch("/api/shortlink", {
                method: "POST",
                body: JSON.stringify(json),
                headers: {"Content-Type": "application/json"}
            });
            const body = await response.json();
            setState(body);
        } catch (e) {
            console.error(e);
        }
    }

    return <div
        className="w-screen flex flex-col justify-center items-center gap-4 h-screen bg-white text-black">
        {state === null ? null :
            <nav>
                <a className="font-bold text-2xl text-blue-400" href={state.data.url}>
                    {state.id}
                </a>
            </nav>
        }
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Input name="name" placeholder="Apelido"/>
            <Input name="url" placeholder="URL"/>
            <button className="bg-indigo-700 text-white px-4 py-2 rounded-md">
                Create shortlink
            </button>
        </form>
    </div>
}

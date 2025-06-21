"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.json();
        if (result.success) {
            router.push(`/dashboard/${username}`);
        } else {
            alert(result.message); // Show meaningful error
        }
    };

    return (
        <div className="relative min-h-[86vh] text-white">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 -z-10 h-full w-full bg-neutral-900 bg-[radial-gradient(#3d3d3d_0.5px,transparent_1px)] [background-size:16px_16px]"></div>
                <form onSubmit={submit} className="flex justify-center flex-col w-2/6 gap-7">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-neutral-600 p-2 w-full"
                        placeholder="Enter Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-neutral-600 p-2 w-full"
                        placeholder="Enter Password"
                    />
                    <button type="submit" className="button group relative inline-flex justify-center overflow-hidden whitespace-nowrap rounded-full px-6 w-full py-1.5 text-center transition-all duration-300 border-2 border-white bg-transparent text-white hover:bg-white">
                        <span className="button-type transition-transform duration-200 group-hover:-translate-y-10 font-semibold">Continue</span>
                        <div className="absolute inset-0 flex translate-y-full transform items-center justify-center transition-transform duration-200 group-hover:translate-y-0">
                            <span className="button-type font-semibold text-black">Continue</span>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
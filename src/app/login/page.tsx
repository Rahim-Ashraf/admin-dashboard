"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

const Login = () => {
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem("auth"));
    }, []);

    const router = useRouter()
    if (token === "token") {
        router.push('/admin-dashboard/users')
    }
    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem('auth', 'token')
        router.push('/admin-dashboard/users')
    }
    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <h1 className="text-5xl mb-2">Login</h1>
            <p className="mb-8">(Please use any demo Email and Password)</p>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email"
                    className="w-full border rounded-md px-4 py-2 mb-4" />
                <input type="text" placeholder="Password"
                    className="w-full border rounded-md px-4 py-2 mb-4" />
                <input type="submit" value="Login"
                    className="w-full bg-sky-500 text-white rounded-md px-4 py-2" />
            </form>
        </div>
    );
}

export default Login
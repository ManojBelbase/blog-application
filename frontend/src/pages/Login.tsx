import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";
import { PATH } from "../const/Path";

export const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await login(username, password);
            navigate(PATH.DASHBOARD);
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8 tracking-tighter uppercase">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-6 bg-(--bg-secondary) p-6 sm:p-10 border border-(--border-color)">
                <Input
                    label="Username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <div className="text-red-500 text-xs font-bold uppercase tracking-tight">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" loading={isLoading}>
                    Sign In
                </Button>

                <p className="text-center text-sm text-(--text-secondary)">
                    Don&apos;t have an account?{" "}
                    <Link to={PATH.REGISTER} className="text-(--text-primary) border-b border-current hover:opacity-70 transition-opacity">
                        SIGN UP
                    </Link>
                </p>
            </form>
        </div>
    );
};
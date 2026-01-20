import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATH } from "../const/Path";
import { Input } from "../components/UI/Input";
import { Button } from "../components/UI/Button";

export const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await register(formData.username, formData.password);
            navigate(PATH.LOGIN);
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8 bg-(--bg-primary) p-8 border border-(--border-color)">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tighter">CREATE ACCOUNT</h2>
                    <p className="text-(--text-secondary) mt-2 uppercase text-xs tracking-widest">Join the minimal blog community</p>
                </div>

                {error && <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm ">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Username"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    <Button type="submit" loading={loading} className="w-full uppercase tracking-widest font-bold">
                        Register
                    </Button>
                </form>

                <p className="text-center text-sm text-(--text-secondary)">
                    Already have an account?{" "}
                    <Link to={PATH.LOGIN} className="text-(--text-primary) border-b border-current hover:opacity-70 transition-opacity">
                        LOGIN
                    </Link>
                </p>
            </div>
        </div>
    );
};

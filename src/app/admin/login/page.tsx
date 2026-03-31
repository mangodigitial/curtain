"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sand-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-semibold text-ocean-deep tracking-wide">
              Curtain Bluff
            </h1>
            <p className="text-sm text-text-light mt-1 tracking-widest uppercase">
              Admin Portal
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 rounded-lg bg-coral/10 border border-coral/30 px-4 py-3 text-sm text-coral">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-sand-dark bg-sand-light/50 px-4 py-2.5 text-sm text-text placeholder:text-text-light/50 focus:border-ocean focus:ring-2 focus:ring-ocean/20 focus:outline-none transition"
                placeholder="you@curtainbluff.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-sand-dark bg-sand-light/50 px-4 py-2.5 text-sm text-text placeholder:text-text-light/50 focus:border-ocean focus:ring-2 focus:ring-ocean/20 focus:outline-none transition"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-ocean-deep py-2.5 text-sm font-medium text-sand hover:bg-ocean transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-text-light mt-6">
          Curtain Bluff Resort &mdash; Antigua, W.I.
        </p>
      </div>
    </div>
  );
}

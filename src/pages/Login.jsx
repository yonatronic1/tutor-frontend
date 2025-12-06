import { useState } from "react";
import { api } from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const submit = async (ev) => {
    ev.preventDefault();
    setMessage("");
    const res = await api.post("/api/tutors/login", form);
    if (res?.token) {
      setToken(res.token);
      setMessage("Login successful");
      localStorage.setItem("token", res.token);
    } else {
      setMessage(res?.message || "Login failed");
    }
  };

  return (
    <section className="max-w-md mx-auto">
      <div className="bg-white/10 rounded-2xl p-8 text-white shadow-xl">
        <h2 className="text-3xl font-extrabold">Login</h2>
        <p className="mt-2 text-white/80">Access your tutor dashboard.</p>

        <form onSubmit={submit} className="mt-6 grid gap-4">
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-300"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="mt-2 px-5 py-3 rounded-lg bg-teal-400 text-slate-900 font-bold hover:bg-teal-300 transition"
          >
            Login
          </button>
          {message && <div className="text-emerald-200 font-semibold">{message}</div>}
          {token && (
            <div className="mt-2 text-white/90 break-all">
              Token: <span className="font-mono">{token}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
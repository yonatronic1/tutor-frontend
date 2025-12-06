import { useState } from "react";

export default function Register() {
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "", price: "", subjects: [] });
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const endpoint = role === "tutor" ? "tutors/register" : "students/register";
      const body = role === "tutor"
        ? { name: form.name, email: form.email, password: form.password, price: Number(form.price), subjects: form.subjects }
        : { name: form.name, email: form.email, password: form.password };

      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      setStatus(res.ok ? "Registered successfully!" : data.error || "Failed");
    } catch {
      setStatus("Network error");
    }
  };

  return (
    <div style={{ padding: "32px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#4A90E2" }}>Create Account</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <label>
          <input type="radio" value="student" checked={role === "student"} onChange={() => setRole("student")} />
          Student
        </label>
        <label>
          <input type="radio" value="tutor" checked={role === "tutor"} onChange={() => setRole("tutor")} />
          Tutor
        </label>
      </div>

      <form onSubmit={submit} style={{ display: "grid", gap: "12px" }}>
        <input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input style={inputStyle} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input style={inputStyle} placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        {role === "tutor" && (
          <>
            <input style={inputStyle} placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input style={inputStyle} placeholder="Subjects (comma separated)" value={form.subjects.join(",")} onChange={(e) => setForm({ ...form, subjects: e.target.value.split(",") })} />
          </>
        )}

        <button style={btnStyle} type="submit">Register</button>
      </form>
      <div style={{ marginTop: "12px", textAlign: "center", color: "#333" }}>{status}</div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btnStyle = {
  backgroundColor: "#4A90E2",
  color: "#fff",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s"
};
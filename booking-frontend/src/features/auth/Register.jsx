import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";
import "../../index.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });

    if (res.success) {
      setMessage("Registration successful! Redirecting…");
      setTimeout(() => navigate("/"), 1200);
    } else {
      setMessage(res.message || "Registration failed.");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleRegister}
          className="card-strong max-w-sm w-full space-y-4"
        >
          <h1 className="text-2xl font-bold text-center">Register</h1>

          {message && (
            <p className="text-blue-600 text-center">{message}</p>
          )}

          <input
            className="input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin (testing)</option>
          </select>

          <button className="btn btn-primary w-full">Register</button>

          <p
            className="text-blue-500 text-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
}

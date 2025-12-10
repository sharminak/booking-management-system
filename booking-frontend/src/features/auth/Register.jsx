import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/api";

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
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200);
    } else {
      setMessage(res.message || "Registration failed.");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="card-strong w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        {message && (
          <p className="bg-blue-50 text-blue-700 p-2 rounded mb-4 text-center">
            {message}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="font-medium block mb-1">Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-medium block mb-1">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-medium block mb-1">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="font-medium block mb-1">Account Type</label>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin (testing)</option>
            </select>
          </div>

          {/* REGISTER BUTTON */}
          <button className="btn btn-primary w-full" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-4 muted">
          Already registered?{" "}
          <span
            className="text-blue-600 font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

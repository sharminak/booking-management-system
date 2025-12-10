import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/api";
import "../../index.css";

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });

    if (res.token) {
      setToken(res.token);
      navigate("/rooms");
    } else {
      setError(res.message || "Login failed");
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
          onSubmit={handleSubmit}
          className="card-strong max-w-sm w-full space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-full">Sign In</button>

          <Link to="/register" className="text-blue-500 block text-center">
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
}

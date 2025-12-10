import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/api";

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
      className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="card-strong w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        {error && (
          <p className="bg-red-50 text-red-600 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
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

          {/* Password */}
          <div>
            <label className="font-medium block mb-1">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button className="btn btn-primary w-full" type="submit">
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 muted">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

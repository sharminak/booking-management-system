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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Sign In
        </button>

        <Link to="/register" className="text-blue-600 block text-center">
          Create an account
        </Link>
      </form>
    </div>
  );
}

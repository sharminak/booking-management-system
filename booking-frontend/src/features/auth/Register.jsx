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

    console.log("REGISTER RESPONSE:", res);

    if (res.success) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200); // go to login page
    } else {
      setMessage(res.message || "Registration failed.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow max-w-sm w-full"
        onSubmit={handleRegister}
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        {message && (
          <p className="mb-3 text-center text-blue-600">{message}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          className="border p-2 w-full mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Optional: Choose role (admin for testing admin panel) */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin (for testing)</option>
        </select>

        <button
          className="bg-blue-600 text-white p-2 w-full rounded"
          type="submit"
        >
          Register
        </button>

        <p
          className="text-center text-sm text-blue-500 mt-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}

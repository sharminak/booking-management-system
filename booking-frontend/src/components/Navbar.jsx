import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  // Decode token (simple way)
  let isAdmin = false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    isAdmin = payload.role === "admin";
  } catch {}

  function logout() {
    setToken(null);
    navigate("/");
  }

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="flex space-x-4">
        <Link to="/rooms" className="hover:underline">Rooms</Link>
        <Link to="/bookings" className="hover:underline">My Bookings</Link>

        {isAdmin && (
          <Link to="/admin" className="hover:underline font-bold">Admin</Link>
        )}
      </div>

      <button
        onClick={logout}
        className="bg-white text-blue-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

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
    <nav className="w-full bg-white/40 backdrop-blur-lg shadow-md border-b border-white/30 fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">

        {/* Left Section - Logo / App Name */}
        <Link
          to="/rooms"
          className="text-2xl font-extrabold text-blue-700 tracking-wide"
        >
          BMS
        </Link>

        {/* Center Navigation Links */}
        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="/rooms"
            className="hover:text-blue-700 transition"
          >
            Rooms
          </Link>

          <Link
            to="/bookings"
            className="hover:text-blue-700 transition"
          >
            My Bookings
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="hover:text-blue-700 transition"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="btn btn-primary px-4 py-1.5"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

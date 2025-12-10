import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function MyBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelMessage, setCancelMessage] = useState("");

  async function fetchBookings() {
    setLoading(true);
    const res = await api.get("/bookings/me", token);
    if (Array.isArray(res)) {
      setBookings(res);
    }
    setLoading(false);
  }

  async function cancelBooking(id) {
    const res = await api.post(`/bookings/${id}/cancel`, {}, token);

    if (res.success) {
      setCancelMessage("Booking cancelled successfully!");
      fetchBookings();
      setTimeout(() => setCancelMessage(""), 1500);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>
      <Navbar />

      <div className="relative z-10 container mt-12">
        <div className="card-strong max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

          {cancelMessage && (
            <p className="bg-green-50 text-green-700 p-3 rounded mb-5 text-center">
              {cancelMessage}
            </p>
          )}

          {loading && (
            <p className="text-gray-600 text-lg text-center">
              Loading your bookings...
            </p>
          )}

          
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b._id} className="p-5 bg-white/80 rounded shadow flex justify-between items-start backdrop-blur-md">
                <div>
                  <h2 className="text-xl font-semibold">{b.roomName}</h2>

                  <p className="text-gray-700 mt-1">
                    {new Date(b.startTime).toLocaleString()} →{" "}
                    {new Date(b.endTime).toLocaleString()}
                  </p>

                  <p
                    className={`mt-2 font-medium ${
                      b.status === "cancelled"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    Status: {b.status}
                  </p>
                </div>

                {b.status === "active" && (
                  <button
                    onClick={() => cancelBooking(b._id)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>

          {!loading && bookings.length === 0 && (
            <p className="text-gray-500 mt-6 text-center">
              You have no bookings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {cancelMessage && (
          <p className="bg-green-100 text-green-600 p-3 rounded mb-4">
            {cancelMessage}
          </p>
        )}

        {loading && (
          <p className="text-gray-600 text-lg">Loading your bookings...</p>
        )}

        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white p-5 rounded shadow flex justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{b.roomName}</h2>
                <p className="text-gray-600">
                  {new Date(b.startTime).toLocaleString()} →{" "}
                  {new Date(b.endTime).toLocaleString()}
                </p>

                <p
                  className={
                    b.status === "cancelled"
                      ? "text-red-600 mt-2"
                      : "text-green-600 mt-2"
                  }
                >
                  Status: {b.status}
                </p>
              </div>

              {b.status === "active" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded h-fit"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>

        {!loading && bookings.length === 0 && (
          <p className="text-gray-500 mt-6">You have no bookings.</p>
        )}
      </div>
    </div>
  );
}

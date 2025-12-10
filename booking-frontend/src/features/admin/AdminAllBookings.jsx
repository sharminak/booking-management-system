import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminAllBookings() {
  const { token } = useAuth();
  const [bookingsByRoom, setBookingsByRoom] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);

    const res = await api.get("/admin/bookings", token);
    if (Array.isArray(res)) {
      setBookingsByRoom(res);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>
      <Navbar />

      <div className="relative z-10 container mt-10">
        <div className="card-strong mb-8">
          <h1 className="text-3xl font-bold">All Bookings</h1>
          <p className="muted mt-1">Admin overview of all rooms & bookings</p>
        </div>

        {loading && (
          <p className="text-white-700 text-lg text-center">Loading bookings...</p>
        )}

        <div className="space-y-8">
          {bookingsByRoom.map((room) => (
            <div key={room.roomId} className="card">
              <h2 className="text-xl font-semibold mb-3">
                Room: {room.roomName}
              </h2>

              <div className="space-y-3">
                {room.bookings.length === 0 && (
                  <p className="muted">No bookings for this room.</p>
                )}

                {room.bookings.map((b) => (
                  <div
                    key={b.id || b._id}
                    className="bg-white/80 border border-gray-200 p-4 rounded-lg backdrop-blur-sm shadow-sm flex justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(b.startTime).toLocaleString()} →{" "}
                        {new Date(b.endTime).toLocaleString()}
                      </p>

                      <p className="muted mt-1">User ID: {b.userId}</p>

                      <span
                        className={
                          b.status === "cancelled"
                            ? "text-red-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        Status: {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!loading && bookingsByRoom.length === 0 && (
          <p className="text-gray-600 text-center mt-6">
            No bookings found.
          </p>
        )}
      </div>
    </div>
  );
}

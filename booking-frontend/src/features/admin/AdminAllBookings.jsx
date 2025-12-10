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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6">All Bookings</h1>

        {loading && <p className="text-gray-600">Loading bookings...</p>}

        <div className="space-y-6">
          {bookingsByRoom.map((room) => (
            <div key={room.roomId} className="bg-white p-5 rounded shadow">
              <h2 className="text-xl font-semibold mb-3">
                Room: {room.roomName}
              </h2>

              <div className="space-y-2">
                {room.bookings.map((b) => (
                  <div
                    key={b._id}
                    className="p-3 bg-gray-100 rounded flex justify-between"
                  >
                    <div>
                      <p className="font-medium">
                        {new Date(b.startTime).toLocaleString()} →{" "}
                        {new Date(b.endTime).toLocaleString()}
                      </p>
                      <p className="text-gray-600">User: {b.userId}</p>

                      <p
                        className={
                          b.status === "cancelled"
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        Status: {b.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {!loading && bookingsByRoom.length === 0 && (
          <p className="text-gray-500">No bookings found.</p>
        )}
      </div>
    </div>
  );
}

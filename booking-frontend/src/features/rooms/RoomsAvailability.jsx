import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function RoomsAvailability() {
  const { token } = useAuth();
  const [date, setDate] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAvailability() {
    if (!date) return;
    setLoading(true);

    const res = await api.get(`/rooms/availability?date=${date}`, token);

    if (Array.isArray(res)) {
      setRooms(res);
    }

    setLoading(false);
  }

  // Fetch whenever date changes
  useEffect(() => {
    fetchAvailability();
  }, [date]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* PAGE HEADER */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Room Availability</h1>

        {/* DATE PICKER */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select a date:
          </label>
          <input
            type="date"
            className="border p-2 rounded w-64"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-600 text-lg">Loading availability...</p>
        )}

        {/* ROOMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <div key={room.roomId} className="bg-white p-5 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{room.roomName}</h2>
              <p className="text-gray-600 mb-3">
                Available slots:
              </p>

              {/* AVAILABLE TIME SLOTS */}
              <div className="space-y-2">
                {room.availableSlots.length === 0 && (
                  <p className="text-red-500">No available times.</p>
                )}

                {room.availableSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-100 rounded"
                  >
                    <span>
                      {slot.start} → {slot.end}
                    </span>

                    <button
                      onClick={() =>
                        (window.location.href = `/bookings/new?room=${room.roomId}&start=${slot.start}&end=${slot.end}`)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!loading && rooms.length === 0 && date && (
          <p className="text-gray-500 mt-6">No rooms found for this date.</p>
        )}
      </div>
    </div>
  );
}

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

  useEffect(() => {
    fetchAvailability();
  }, [date]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>
      <Navbar />

      <div className="relative z-10 container mt-12 max-w-5xl">
        <div className="card-strong">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Room Availability
          </h1>

        
          <div className="mb-6">
            <label className="block font-medium mb-2">Select a date:</label>
            <input
              type="date"
              className="input w-64"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

        
          {loading && (
            <p className="text-gray-600 text-lg text-center">
              Loading availability...
            </p>
          )}

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => (
              <div
                key={room.roomId}
                className="p-5 bg-white/80 rounded shadow backdrop-blur-md"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {room.roomName}
                </h2>
                <p className="text-gray-700 mb-3">Available slots:</p>

                <div className="space-y-2">
                  {room.availableSlots.length === 0 && (
                    <p className="text-red-600">No available times.</p>
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
                        className="btn btn-primary px-3 py-1"
                      >
                        Book
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        
          {!loading && rooms.length === 0 && date && (
            <p className="text-gray-500 mt-6 text-center">
              No rooms found for this date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

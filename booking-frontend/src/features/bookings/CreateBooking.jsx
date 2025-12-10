import "../../index.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function CreateBooking() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const params = new URLSearchParams(window.location.search);
  const initialRoomId = params.get("room");
  const initialStart = params.get("start");
  const initialEnd = params.get("end");

  const [roomId, setRoomId] = useState(initialRoomId || "");
  const [startTime, setStartTime] = useState(initialStart || "");
  const [endTime, setEndTime] = useState(initialEnd || "");
  const [rooms, setRooms] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchRooms() {
    const res = await api.get("/rooms", token);
    console.log("ROOMS FROM BACKEND:", res);
    if (Array.isArray(res)) setRooms(res);
  }

  
  useEffect(() => {
    if (token) fetchRooms();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await api.post(
      "/bookings",
      { roomId, startTime, endTime },
      token
    );

    if (res.conflict) {
      setError("This room is already booked in the chosen time range.");
    } else if (res.id) {
      setSuccess("Booking created successfully!");
      setTimeout(() => navigate("/bookings"), 1000);
    } else {
      setError("Unexpected error occurred.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create Booking</h1>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3">{error}</p>
        )}

        {success && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-3">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Select Room</label>
            <select
              className="border p-2 rounded w-full"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            >
              <option value="">Choose a room</option>

              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (capacity {r.capacity})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded mt-2">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

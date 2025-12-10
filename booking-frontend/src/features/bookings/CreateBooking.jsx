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

  
  const [roomId, setRoomId] = useState(
    initialRoomId ? String(initialRoomId) : ""
  );
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
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>
      <Navbar />

      <div className="relative z-10 container mt-12">
        <div className="card-strong max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Booking
          </h1>

          {error && (
            <p className="bg-red-50 text-red-600 p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-50 text-green-700 p-2 rounded mb-4 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="font-medium block mb-1">Select Room</label>
              <select
                className="input"
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
              <label className="font-medium block mb-1">Start Time</label>
              <input
                type="datetime-local"
                className="input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            
            <div>
              <label className="font-medium block mb-1">End Time</label>
              <input
                type="datetime-local"
                className="input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-full mt-2">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

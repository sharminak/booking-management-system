import { useState } from "react";
import Navbar from "../../components/Navbar";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminCreateRoom() {
  const { token } = useAuth();
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await api.post(
      "/rooms",
      { name, capacity: Number(capacity) },
      token
    );

    if (res.success) {
      setMessage("Room created successfully!");
      setName("");
      setCapacity("");
    } else {
      setMessage("Error creating room");
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      
      <div className="absolute inset-0 bg-black/40"></div>
      <Navbar />

      <div className=" relative z-10 container mt-12">
        <div className="card-strong max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create New Room
          </h1>

          {message && (
            <p className="bg-blue-50 text-blue-700 p-2 rounded mb-4 text-center">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <label className="font-medium block mb-1">Room Name</label>
              <input
                className="input"
                placeholder="Example: Meeting Room A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            
            <div>
              <label className="font-medium block mb-1">Capacity</label>
              <input
                type="number"
                className="input"
                placeholder="Example: 10"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>

           
            <button className="btn btn-primary w-full" type="submit">
              Create Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

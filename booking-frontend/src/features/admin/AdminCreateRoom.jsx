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

  console.log("Sending request to backend...");

  const res = await api.post(
    "/rooms",
    { name, capacity: Number(capacity) },
    token
  );

  console.log("RESPONSE FROM BACKEND:", res);

  if (res.success) {
    setMessage("Room created successfully!");
    setName("");
    setCapacity("");
  } else {
    setMessage("Error creating room");
  }
}


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Create Room</h1>

        {message && (
          <p className="bg-green-100 text-green-600 p-2 rounded mb-3">
            {message}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full rounded"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            type="number"
          />

          <button className="bg-blue-600 text-white p-2 w-full rounded">
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
}

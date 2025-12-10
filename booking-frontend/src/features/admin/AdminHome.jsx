import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="space-y-4">
          <Link
            to="/admin/create-room"
            className="block bg-blue-600 text-white p-3 rounded text-center"
          >
            ➕ Create New Room
          </Link>

          <Link
            to="/admin/bookings"
            className="block bg-green-600 text-white p-3 rounded text-center"
          >
            📄 View All Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

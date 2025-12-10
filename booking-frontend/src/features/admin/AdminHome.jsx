import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import {
  PlusCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";

export default function AdminHome() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
     
      <div className="absolute inset-0 bg-black/40"></div>
      <Navbar />

      <div className="relative z-10 container mt-12 flex justify-center">
        <div className="card-strong max-w-2xl w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <p className="muted mb-6">
            Manage rooms, view system bookings, and oversee platform activity.
          </p>

          <div className="space-y-4">
            
            <Link to="/admin/create-room" className="btn btn-primary w-full flex items-center justify-center gap-2">
              <PlusCircleIcon className="w-6 h-6 text-white" />
              <span>Create New Room</span>
            </Link>

            
            <Link
              to="/admin/bookings"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(180deg,#059669,#047857)" }}
            >
              <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
              <span>View All Bookings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

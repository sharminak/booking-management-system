import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import RoomsAvailability from "./features/rooms/RoomsAvailability";
import MyBookings from "./features/bookings/MyBookings";
import CreateBooking from "./features/bookings/CreateBooking";

import AdminHome from "./features/admin/AdminHome";
import AdminCreateRoom from "./features/admin/AdminCreateRoom";
import AdminAllBookings from "./features/admin/AdminAllBookings";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminHome />} />
<Route path="/admin/create-room" element={<AdminCreateRoom />} />
<Route path="/admin/bookings" element={<AdminAllBookings />} />

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<RoomsAvailability />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/bookings/new" element={<CreateBooking />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

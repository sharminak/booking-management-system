import { bookings, rooms } from "../data/db.js";

export function createBooking(req, res) {
  const { roomId, startTime, endTime } = req.body;
  const userId = req.user.id;

  const conflict = bookings.filter(
    (b) =>
      b.roomId === roomId &&
      b.status === "active" &&
      startTime < b.endTime &&
      endTime > b.startTime
  );

  if (conflict.length > 0) {
    return res.json({
      conflict: true,
      message: "Room is already booked.",
      conflictingBookings: conflict,
    });
  }

  const newBooking = {
    id: Date.now().toString(),
    roomId,
    userId,
    startTime,
    endTime,
    status: "active",
  };

  bookings.push(newBooking);

  res.json(newBooking);
}

export function myBookings(req, res) {
  const userId = req.user.id;

  const userBookings = bookings
    .filter((b) => b.userId === userId)
    .map((b) => ({
      ...b,
      roomName: rooms.find((r) => r.id === b.roomId)?.name,
    }));

  res.json(userBookings);
}

export function cancelBooking(req, res) {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) return res.json({ message: "Not found" });

  booking.status = "cancelled";

  res.json({ success: true });
}

export function adminAllBookings(req, res) {
  const group = rooms.map((room) => {
    const roomBookings = bookings.filter((b) => b.roomId === room.id);

    return {
      roomId: room.id,
      roomName: room.name,
      bookings: roomBookings,
    };
  });

  res.json(group);
}

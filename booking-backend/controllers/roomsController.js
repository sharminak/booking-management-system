import { rooms, bookings } from "../data/db.js";


export function createRoom(req, res) {
  const { name, capacity } = req.body;

  const newRoom = {
    id: Date.now().toString(),
    name,
    capacity,
  };

  rooms.push(newRoom);

  res.json({
    success: true,
    ...newRoom,
  });
}

// GET ALL ROOMS (For dropdowns and lists)
export function getRooms(req, res) {
  res.json(rooms);
}

export function checkAvailability(req, res) {
  const { date } = req.query;
  if (!date) return res.json([]);

  // Build selected day range
  const dayStart = new Date(`${date}T00:00:00`);
  const dayEnd = new Date(`${date}T23:59:59`);

  const response = rooms.map((room) => {
    // Find all bookings for this room on this day
    const roomBookings = bookings.filter(
      (b) =>
        b.roomId === room.id &&
        new Date(b.startTime) < dayEnd &&
        new Date(b.endTime) > dayStart &&
        b.status === "active"
    );

    // Create availability slots (simple: morning / afternoon / evening)
    const defaultSlots = [
      { start: `${date}T09:00`, end: `${date}T12:00` },
      { start: `${date}T12:00`, end: `${date}T15:00` },
      { start: `${date}T15:00`, end: `${date}T18:00` },
    ];

    // Remove booked slots
    const available = defaultSlots.filter((slot) => {
      return !roomBookings.some(
        (b) => slot.start < b.endTime && slot.end > b.startTime
      );
    });

    return {
      roomId: room.id,
      roomName: room.name,
      availableSlots: available,
    };
  });

  res.json(response);
}

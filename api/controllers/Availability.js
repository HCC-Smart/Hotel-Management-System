import Availability from "../models/Availability.js";
import mongoose from "mongoose";
import Room from "../models/Room.js";
import express from "express";
import Booking from "../models/Booking.js"

// Assuming you have established a connection to MongoDB using Mongoose
const app = express.Router();
// Function to check room availability
app.get('/:_id/checkAvailability', async (req, res) => {
  const _id = req.params._id;
  const startDate = req.query.startDate; // Assuming startDate is provided as a query parameter
  const endDate = req.query.endDate; // Assuming endDate is provided as a query parameter

  try {
    // Find the room by its ID
    const room = await Room.findById(_id);

    // Check if the room exists
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if the room is available within the specified dates
    const bookings = await Booking.find({
      room: mongoose.Types.ObjectId(_id),
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ],
    });

    if (bookings.length > 0) {
      res.json({ isAvailable: false });
    } else {
      res.json({ isAvailable: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking room availability' });
  }
});

export default app
// Usage example
// const roomId = '60f9e1b35e8f2b001f8a2a7d'; // ID of the room you want to check
// const startDate = new Date('2023-10-29');
// const endDate = new Date('2023-10-31');

// checkRoomAvailability(roomId, startDate, endDate);
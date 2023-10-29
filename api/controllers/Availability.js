import Availability from "../models/Availability.js";
import mongoose from "mongoose";
import Room from "../models/Room.js";
import express from "express";

// Assuming you have established a connection to MongoDB using Mongoose

// Function to check room availability
async function checkRoomAvailability(roomId, startDate, endDate) {
  try {
    // Find the room by its ID
    const room = await Room.findById(roomId);

    // Check if the room exists
    if (!room) {
      console.log('Room not found');
      return;
    }

    // Check if the room is available within the specified dates
    const bookings = await Booking.find({
      room: mongoose.Types.ObjectId(roomId),
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ],
    });

    if (bookings.length > 0) {
      console.log('Room is not available for the specified dates');
    } else {
      console.log('Room is available for the specified dates');
    }
  } catch (error) {
    console.log('Error checking room availability:', error);
  }
}

// Usage example
const roomId = '60f9e1b35e8f2b001f8a2a7d'; // ID of the room you want to check
const startDate = new Date('2023-10-29');
const endDate = new Date('2023-10-31');

checkRoomAvailability(roomId, startDate, endDate);
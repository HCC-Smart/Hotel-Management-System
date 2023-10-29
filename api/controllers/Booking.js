import express from "express";
import Booking from "../models/Booking.js"

const app = express.Router();

// Routes for Bookings
// GET all bookings
app.get('/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // POST new booking
  app.post('/bookings', async (req, res) => {
    try {
      const booking = await Booking.create(req.body);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // UPDATE booking by ID
  app.put('/bookings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await Booking.findByIdAndUpdate(id, req.body, { new: true });
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // DELETE booking by ID
  app.delete('/bookings/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Booking.findByIdAndDelete(id);
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

export default app
import express from 'express'
import Room from '../models/Room.js';

const app = express.Router();

// Routes for Rooms
// GET all rooms
app.get('/rooms', async (req, res) => {
    try {
      const rooms = await Room.find();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // POST new room
  app.post('/rooms', async (req, res) => {
    try {
      const room = await Room.create(req.body);
      res.json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // UPDATE room by ID
  app.put('/rooms/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
      res.json(room);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // DELETE room by ID
  app.delete('/rooms/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Room.findByIdAndDelete(id);
      res.json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  export default app
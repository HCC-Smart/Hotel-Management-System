import mongoose from "mongoose";
import express from "express";
import Hotel from "../models/Hotel.js"


const app = express.Router();
// POST new hotel
app.post('/create-hotel',  async (req, res) => {
    try {
      const hotel = await Hotel.create(req.body);
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // GET all hotels
  app.get('/hotels', async (req, res) => {
    try {
      const hotels = await Hotel.find();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET hotel by ID
  app.get('/hotels/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ error:error.message });
    }
  });
  
  // PUT update hotel by ID
  app.put('/hotels/:id',  async (req, res) => {
    try {
      const { id } = req.params;
      const hotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
      res.json(hotel);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

export default app
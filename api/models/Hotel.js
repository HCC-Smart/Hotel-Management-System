import mongoose from "mongoose";

// Hotel Schema
const HotelSchema = new mongoose.Schema({
    name: String,
    address: String,
  });
  
  const Hotel = mongoose.model('Hotel', HotelSchema);
  
  export default Hotel
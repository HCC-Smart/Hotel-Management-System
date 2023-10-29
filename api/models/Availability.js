import mongoose from "mongoose";

// Availability Schema
const AvailabilitySchema = new mongoose.Schema({
    
    room: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room' },
    available: Boolean,
  });
  
  const Availability = mongoose.model('Availability', AvailabilitySchema);

  export default Availability
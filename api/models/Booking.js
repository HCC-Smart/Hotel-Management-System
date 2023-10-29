import mongoose from "mongoose";


// Booking Schema
const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User' },
    room: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Room' },
    startDate: Date,
    endDate: Date,
  });
  
   const Booking = mongoose.model('Booking', BookingSchema);
   export default Booking

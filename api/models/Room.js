import mongoose from "mongoose";

// Room Schema
const RoomSchema = new mongoose.Schema({
    hotel: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Hotel'
         },
    roomNumber: String,
  });
  
  const Room = mongoose.model('Room', RoomSchema);
  
  export default Room
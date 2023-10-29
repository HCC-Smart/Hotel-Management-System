import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
       },
    email: {
         type: String,
         unique: true
         },
    password: String,
    loyalty: { 
        type: Number,
         default: 0 },
  });
  
  const User = mongoose.model('User', UserSchema);
   export default User

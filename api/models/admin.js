import mongoose from "mongoose";
// Admin Schema
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
   },
    email: {
          type: String,
          unique: true
         },
    password: String,
  });
  
  const Admin = mongoose.model('Admin', AdminSchema);
 
  export default Admin
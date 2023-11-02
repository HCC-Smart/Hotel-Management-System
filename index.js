import express  from "express"
import admin from "./routers/admin.js"
import user from './routers/user.js'
import hotel from "./routers/hotel.js"
import room from "./routers/room.js"
import booking from "./routers/booking.js"
import dotenv from "dotenv"


const app = express();
const PORT = process.env.PORT || 1000

app.use(express.json());

app.use("/api/admin", admin)
app.use("/api/user", user)
app.use("/api/hotel", hotel)
app.use("/api/room" , room)
app.use("/api/booking" , booking)


app.listen(PORT, () => console.log(`server running on port ${PORT}`));


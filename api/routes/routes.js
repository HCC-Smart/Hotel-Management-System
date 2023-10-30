import express from "express";
import BookingRoutes from "../controllers/Booking.js"
import HotelRoutes from "../controllers/Hotel.js"
import RoomRoutes from "../controllers/Room.js";
import UserRoutes from "../controllers/user.js";
import AdminRoutes from "../controllers/Admin.js";
import AvailabilityRoute from "../controllers/Availability.js"

const router = express.Router();

router.use("/booking",  BookingRoutes)
router.use("/hotel",  HotelRoutes)
router.use("/room", RoomRoutes)
router.use("/room/:_id/checkAvailability", AvailabilityRoute)
router.use("/user", UserRoutes )
router.use("/admin", AdminRoutes )

export default router;
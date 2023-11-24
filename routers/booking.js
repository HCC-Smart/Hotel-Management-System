import express from "express";
import prisma from "../api/lib/index.js"
import { userAuth } from "../api/middleware/authenticate.js";

const app = express.Router();

// userId
// roomNumber
// startDate
// endDate
// 2023-10-26T09:30:00Z

app.post("/create-booking", userAuth, async (req, res) => {
    const userId = req.user.id
    
    const {roomId, startDate, endDate, } = req.body
    try{
        const NewBooking = await prisma.booking.create({
            data:{
                roomId: roomId,
                startDate: startDate,
                endDate: endDate,
                userId: userId
            }
            
        })
        
        return res.status(201).json({
            mesage: "Booking created successfully",
            NewBooking: NewBooking
        })
    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }


})


//Get booking
app.get('/', async (req, res) => {
    try {
      const Booking = await prisma.booking.findMany();
      res.json(Booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

    // GET booking by ID
    app.get('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const booking = await prisma.booking.findUnique({
                where:{
                    id: id
                }
            });
          res.json({
            booking: booking,
        });
        } catch (error) {
          res.status(400).json({
             error: error.message 
            });
        }
      });


      
      // PUT update booking by ID
      app.put("/:id", userAuth, async (req, res) => {
        const bkId = parseInt(req.params.id);
        const userId = req.user.id
        const {roomNumber, startDate, endDate, } = req.body
        try {
          const updateBooking = await prisma.booking.update({
            where: { id: bkId },
            data: {
                roomNumber: roomNumber,
                startDate: startDate,
                endDate: endDate,
                userId: userId
            },
          });
          
          return res.status(200).json({
            message: "booking updated successfully",
            booking: updateBooking,
          });
        } catch (err) {
          return res.status(500).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      });
  
      //delete booking by id
      app.delete("/:id", userAuth, async (req, res) => {
        const BookingId = parseInt(req.params.id);
        try {
          const deleteBooking = await prisma.booking.delete({
            where: { id: BookingId },
          });
          if (!deleteBooking) {
            return res.status(404).json({
              message: "admin not found",
            });
          }
      
          return res.status(200).json({
            message: "your booking deleted successfully",
          });
        } catch (err) {
          return res.status(500).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      });
      

export default app
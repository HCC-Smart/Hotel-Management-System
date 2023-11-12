import express from "express";
import prisma from "../api/lib/index.js"
import { authenticate } from "../api/middleware/authenticate.js";

const app = express.Router();

app.post("/create-room", authenticate, async (req, res) => {
    
    const { RoomType, perNight, hotelId} = req.body
    try{
        const NewRoom = await prisma.room.create({
            data:{
              RoomType:RoomType,
                perNight: perNight,
                hotelId: hotelId
            }

        })

        return res.status(201).json({
            mesage: "room created successfully",
            NewRoom: NewRoom
        })
    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }


})


//Get rooms
app.get('/', async (req, res) => {
    try {
      const rooms = await prisma.room.findMany();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

    // GET room by ID
    app.get('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const room = await prisma.room.findUnique({
                where:{
                    id: id
                }
            });
          res.json({
            room: room,
        });
        } catch (error) {
          res.status(400).json({
             error: error.message 
            });
        }
      });
      
      // PUT update room by ID
      app.put("/:id", authenticate, async (req, res) => {
        const rmId = parseInt(req.params.id);
        const {RoomType, perNight, hotelId } = req.body;
        try {
          const updateHotel = await prisma.room.update({
            where: { id: rmId },
            data: {
              
              RoomType:RoomType,
                perNight: perNight,
                hotelId: hotelId
            },
          });
          return res.status(200).json({
            message: "room updated successfully",
            hotel: updateHotel,
          });
        } catch (err) {
          return res.status(500).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      });
  
      //room delete by Id
      app.delete("/:id", authenticate, async (req, res) => {
        const roomId = parseInt(req.params.id);
        try {
          const deleteRoom = await prisma.room.delete({
            where: { id: roomId },
          });
          if (!deleteRoom) {
            return res.status(404).json({
              message: "admin was not found",
            });
          }
      
          return res.status(200).json({
            message: "room deleted successfully",
          });
        } catch (err) {
          return res.status(500).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      });
      



export default app
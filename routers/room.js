import express from "express";
import prisma from "../api/lib/index.js"
import { authenticate } from "../api/middleware/authenticate.js";

const app = express.Router();

app.post("/create", authenticate, async (req, res) => {
    
    const { roomNum, hotelId} = req.body
    try{
        const NewRoom = await prisma.room.create({
            data:{
                roomNum: roomNum,
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
        const { roomNum, hotelId } = req.body;
        try {
          const updateHotel = await prisma.room.update({
            where: { id: rmId },
            data: {
                roomNum: roomNum,
                hotelId: hotelId
            },
          });
      
          return res.status(200).json({
            message: "Hotel updated successfully",
            hotel: updateHotel,
          });
        } catch (err) {
          return res.status(500).json({
            message: "something went wrong",
            error: err.message,
          });
        }
      });
  




export default app
import express from "express";
import prisma from "../api/lib/index.js"
import { authenticate } from "../api/middleware/authenticate.js";

const app = express.Router();

app.post("/", authenticate, async (req, res) => {
    const adminId = req.admin.id
    const { name, address } = req.body
    try{
        const NewHotel = await prisma.hotel.create({
            data:{
                name: name,
                address: address,
                adminId: adminId
            }

        })
        return res.status(201).json({
            mesage: "Hotel creation successfully",
            NewHotel: NewHotel
        })
    }catch(err){
        return res.status(500).json({
            message: "something went wrong",
            error: err.message
        })
    }


})
//Get hotels
app.get('/', async (req, res) => {
    try {
      const hotels = await prisma.hotel.findMany();
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

    // GET hotel by ID
    app.get('/:id', async (req, res) => {
        try {
          const { id } = req.params;
          const hotel = await prisma.hotel.findUnique(id);
          res.json(hotel);
        } catch (error) {
          res.status(400).json({ error:error.message });
        }
      });
      
      // PUT update hotel by ID
      app.put("/:id", authenticate, async (req, res) => {
        const adminId = req.admin.id
        const htlId = parseInt(req.params.id);
        const { name, address } = req.body;
        try {
          const updateHotel = await prisma.hotel.update({
            where: { id: htlId },
            data: {
              name,
              address,
              adminId,
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
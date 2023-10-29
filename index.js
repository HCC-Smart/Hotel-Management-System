import express  from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./api/routes/routes.js";


const app = express();
const PORT = 9000

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, (err)=>{
    if(err){
        console.log(`something went wrong ${err}` )
    }else{
        console.log("mongodb connected");
    }
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.use("/api", router)
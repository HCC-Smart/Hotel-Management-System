// Setup Sign up and Login API for Owner
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import "dotenv/config.js"
import User from "../models/user.js"
const SECTRET_KEY = process.env.SECRET_KEY

const app = express.Router();

app.post('/signup', async (req, res) => {
    const {name, email, password} = req.body

    try {
        
        const existingOwner = await User.findOne({
            where: {
                email: email,
            }
        })

        if(existingOwner) {
            return res.status(409).json({status: 409, message: "user already exists"})
        }

        const hashePassword = await bcrypt.hash(password, 10)

        const newOwner = await User.create({
            data: {
                name: name,
                email: email,
                password: hashePassword
            }
        })

        res.status(201).json({status: 201, message: "user created successFully", newOwner})

    } catch (error) {
        res.status(500).json({status: 500, message: "Something went wrong", error: error.message})
    }
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body

    try {
        
        const existingOwner = await User.find({
            where: {
                email: email
            }
        })

        if(!existingOwner) {
            return res.status(404).json({status: 404, message: "user not found"})
        }

        const isCorrectPassword =  bcrypt.compare(password, existingOwner.password)

        if(!isCorrectPassword) {
            return res.status(401).json({status: 401, message: "incorrect Password"})
        }

        const token = jwt.sign(
            {id: existingOwner.id, email: existingOwner.email},
            SECTRET_KEY,
            {expiresIn: "1h"}
        )

        res.status(200).json({status: 200, message: "admin logged in successfully", token})

    } catch (error) {
        res.status(500).json({status: 500, message: "Something went wrong", error: error.message})
    }
})

export default app
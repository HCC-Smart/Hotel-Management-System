// set up token middleware here
import jwt from 'jsonwebtoken'
import "dotenv/config.js"
const SECTRET_KEY = process.env.SECRET_KEY

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({status: 401, message: "Admin Authentication failed - missing token"})
    }

    console.log("token", token)

    const tokenWithoutBearar = token.split(" ")[1]

    jwt.verify(tokenWithoutBearar, SECTRET_KEY, (error, admin) => {
        if(error) {
            return res.status(401).json({status: 401, message: "Admin Authentication failed - missing token"})
        }

        req.admin = admin

        next()
    })

}

export const userAuth = (req, res, next) => {
    const token = req.headers.authorization

    if(!token) {
        return res.status(401).json({status: 401, message: "User Authentication failed - missing token"})
    }

    console.log("token", token)

    const tokenWithoutBearar = token.split(" ")[1]

    jwt.verify(tokenWithoutBearar, SECTRET_KEY, (error, user) => {
        if(error) {
            return res.status(401).json({status: 401, message: "User Authentication failed - missing token"})
        }

        req.user = user

        next()
    })

}
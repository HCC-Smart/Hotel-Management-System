import express from "express";
import bcrypt from 'bcrypt'
import prisma from "../api/lib/index.js"
import Jwt from "jsonwebtoken";
import "dotenv/config"
import { userAuth } from "../api/middleware/authenticate.js";
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body
  try {

    const isexisting = await prisma.user.findUnique({
      where: {
        email: email,


      }
    })

    if (isexisting) {
      return res.status(409).json({
        message: "user is alredy exist"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newuser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    })

    return res.status(201).json({
      message: "user creation successfully",
      user: newuser
    })

  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message
    })
  }
})


router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {

    const isexistinguser = await prisma.user.findUnique({
      where: {
        email

      }
    })

    if (!isexistinguser) {
      res.status(404).json({
        message: "user was not found"
      })
    }

    const checkPassword = await bcrypt.compare(password, isexistinguser.password)

    if (!checkPassword) {
      res.status(401).json({
        message: 'invalid credentials'
      })
    }


    const token = Jwt.sign(
      { id: isexistinguser.id },
      SECRET_KEY,
      { expiresIn: '7h' }

    )
    return res.status(201).json({
      message: 'user logedin successfully',
      token: token
    })

  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message
    })
  }
})


router.put('/update', userAuth, async (req, res) => {
  const userId = req.user.id
  const { name, email, password } = req.body;

  try {
    const updateduser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
      }
    });

    return res.status(200).json({
      message: 'user information updated successfully',
      user: updateduser
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message
    });
  }
});


router.delete('/delate', userAuth, async (req, res) => {
  const userId = req.user.id

  try {
    const deleteuser = await prisma.user.delete({
      where: { id: userId }
    });

    if (!deleteuser) {
      return res.status(404).json({
        message: "user was not found"
      });
    }

    return res.status(200).json({
      message: 'user deleted successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message
    });
  }
});




router.get('/curent-user', userAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,

        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }

    return res.status(200).json({
      message: 'user information retrieved successfully',
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});


router.get('/', async (req, res) => {

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,

      },
    });

    return res.status(200).json({
      message: 'users list retrieved successfully',
      users,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});



export default router;
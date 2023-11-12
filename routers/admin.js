import express from "express";
import bcrypt from 'bcrypt'
import prisma from "../api/lib/index.js"
import Jwt from "jsonwebtoken";
import "dotenv/config"
import { authenticate } from "../api/middleware/authenticate.js";
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body
  try {

    const isexisting = await prisma.admin.findUnique({
      where: {
        email: email,

      }
    })

    if (isexisting) {
      return res.status(409).json({
        message: "admin is alredy exist"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = await prisma.admin.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    })

    return res.status(201).json({
      message: "admin creation successfully",
      admin: newAdmin
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

    const isexistingadmin = await prisma.admin.findUnique({
      where: {
        email

      }
    })

    if (!isexistingadmin) {
      res.status(404).json({
        message: "admin was not found"
      })
    }


    const checkPassword = await bcrypt.compare(password, isexistingadmin.password)

    if (!checkPassword) {
      res.status(401).json({
        message: 'invalid credentials'
      })
    }


    const token = Jwt.sign(
      { id: isexistingadmin.id },
      SECRET_KEY,
      { expiresIn: '3h' }

    )
    return res.status(201).json({
      message: 'admin logedin successfully',
      token: token
    })

  } catch (err) {
    return res.status(500).json({
      message: "something went wrong",
      error: err.message
    })
  }
})


router.put('/update', authenticate, async (req, res) => {
  const adminId = req.admin.id
  const {name, email, password } = req.body;

  try {
    const updatedadmin = await prisma.admin.update({
      where: { id: adminId },
      data: {
        name,
        email,
        password: password ? await bcrypt.hash(password, 10) : undefined,
      }
    });

    return res.status(200).json({
      message: 'admin information updated successfully',
      admin: updatedadmin
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message
    });
  }
});


router.delete('/delate', authenticate, async (req, res) => {
  const adminId = req.admin.id

  try {
    const deleteadmin = await prisma.admin.delete({
      where: { id: adminId }
    });

    if (!deleteadmin) {
      return res.status(404).json({
        message: "admin was not found"
      });
    }

    return res.status(200).json({
      message: 'admin deleted successfully'
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message
    });
  }
});




router.get('/current-admin', authenticate, async (req, res) => {
  const adminId = req.admin.id;

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        message: 'admin not found',
      });
    }

    return res.status(200).json({
      message: 'admin information retrieved successfully',
      admin,
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
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,

      },
    });

    return res.status(200).json({
      message: 'admins list retrieved successfully',
      admins,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  }
});



export default router;
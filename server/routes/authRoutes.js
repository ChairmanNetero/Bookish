import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Sign Up route
router.post('/SignUp', async (req, res) => {
    try {
        const {name, email, password} = req.body

        // Check if email exists
        const existingUser = await prisma.user.findUnique({where: {email}})
        if (existingUser) {
            return res.status(400).json({error: 'User already exist'})
        }

        // Hash the password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        // Create new user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        })

        // Generate JWT token
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

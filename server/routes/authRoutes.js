import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Sign Up route
router.post('/SignUp', async (req, res) => {
    try {
        const {email, password} = req.body

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
            }
        })

    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

// Login route
router.post('/Login', async (req, res) => {
    try {
        const {email, password} = req.body

        // Verify if input is not empty
        if (!email || !password) {
            return res.status(400).json({error: 'Email and password is required'})
        }

        // Find user by email
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) {
            return res.status(400).json({error: 'User does not exist'})
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({error: 'Invalid email or password'})
        }

        // Generate JWT token
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            message: 'User logged in successfully',
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        })

    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

export default router

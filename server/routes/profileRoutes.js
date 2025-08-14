import express from 'express'
import bcrypt from 'bcrypt'
import prisma from '../prismaClient.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Apply authMiddleware to all routes in this router
router.use(authMiddleware)

// Get user profile
router.get('/profile', async (req, res) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { email: req.email },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        res.status(200).json({
            message: 'Profile retrieved successfully',
            user
        })
    } catch (error) {
        console.error('Profile retrieval error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

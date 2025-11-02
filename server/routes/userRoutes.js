import express from 'express'
import prisma from '../prismaClient.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Apply authMiddleware to all routes in this router
router.use(authMiddleware)

// Get user profile
router.get('/user/me', async (req, res) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                gender: true,
                country: true,
                bio: true,
                profileImage: true,
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

router.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params

        // Convert userId to integer since it comes as a string from URL params
        const userIdInt = parseInt(userId, 10)

        // Validate that userId is a valid number
        if (isNaN(userIdInt)) {
            return res.status(400).json({ error: 'Invalid user ID format' })
        }

        const user = await prisma.user.findUnique({
            where: { id: userIdInt },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                gender: true,
                country: true,
                bio: true,
                profileImage: true,
            }
        })

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json({
            message: 'Profile retrieved successfully',
            user
        })
    } catch (error) {
        console.error('Profile retrieval error:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Update user profile
router.put('/user/me', async (req, res) => {
    try {
        const { firstName, lastName, gender, country, bio } = req.body

        // Validate gender enum if provided
        const validGenders = ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']
        if (gender && !validGenders.includes(gender)) {
            return res.status(400).json({
                error: 'Invalid gender value. Must be one of: MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY'
            })
        }

        // Build update object with only provided fields
        const updateData = {}
        if (firstName !== undefined) updateData.firstName = firstName
        if (lastName !== undefined) updateData.lastName = lastName
        if (gender !== undefined) updateData.gender = gender
        if (country !== undefined) updateData.country = country
        if (bio !== undefined) updateData.bio = bio

        // If no fields to update, return error
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                error: 'No valid fields provided for update'
            })
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                gender: true,
                country: true,
                bio: true,
                profileImage: true,
            }
        })

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        })
    } catch (error) {
        console.error('Profile update error:', error)

        // Handle specific Prisma errors
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(500).json({ error: 'Internal server error' })
    }
})

// Update specific profile field (alternative endpoint for partial updates)
router.patch('/profile/:field', async (req, res) => {
    try {
        const { field } = req.params
        const { value } = req.body

        const allowedFields = ['firstName', 'lastName', 'gender', 'country', 'bio']

        if (!allowedFields.includes(field)) {
            return res.status(400).json({
                error: `Invalid field. Allowed fields: ${allowedFields.join(', ')}`
            })
        }

        // Validate gender enum if updating gender
        if (field === 'gender') {
            const validGenders = ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']
            if (value && !validGenders.includes(value)) {
                return res.status(400).json({
                    error: 'Invalid gender value. Must be one of: MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY'
                })
            }
        }

        const updateData = { [field]: value }

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                gender: true,
                country: true,
                bio: true,
                profileImage: true,
            }
        })

        res.status(200).json({
            message: `${field} updated successfully`,
            user: updatedUser
        })
    } catch (error) {
        console.error(`Profile ${req.params.field} update error:`, error)

        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
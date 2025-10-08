import express from 'express'
import multer from 'multer'
import prisma from '../prismaClient.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Configure multer to store files in memory as buffers
const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
})

// Upload profile image endpoint
router.post('/upload/profile', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided' })
        }

        // Convert buffer to base64 string
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

        // Update user's profile image in database
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { profileImage: base64Image },
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
            message: 'Profile image uploaded successfully',
            imageUrl: base64Image,
            user: updatedUser
        })
    } catch (error) {
        console.error('Image upload error:', error)

        if (error.message === 'Only image files are allowed') {
            return res.status(400).json({ error: error.message })
        }

        res.status(500).json({ error: 'Failed to upload image' })
    }
})

export default router
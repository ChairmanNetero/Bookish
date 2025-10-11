import express from 'express'
import prisma from '../prismaClient.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

// Apply authMiddleware to all routes
router.use(authMiddleware)

// Get user's reading list
router.get('/reading-list', async (req, res) => {
    try {
        const userId = req.user.id

        const readingList = await prisma.readingList.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                addedAt: 'desc'
            }
        })

        res.status(200).json(readingList)
    } catch (error) {
        console.error('Error fetching reading list:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Add book to reading list
router.post('/reading-list', async (req, res) => {
    try {
        const { bookId } = req.body
        const userId = req.user.id

        if (!bookId) {
            return res.status(400).json({ error: 'bookId is required' })
        }

        // Check if user has already reviewed this book
        const existingReview = await prisma.review.findUnique({
            where: {
                userId_bookId: {
                    userId: userId,
                    bookId: bookId
                }
            }
        })

        if (existingReview) {
            return res.status(400).json({ error: 'Cannot add reviewed books to reading list' })
        }

        // Check if book already exists in reading list
        const existingEntry = await prisma.readingList.findUnique({
            where: {
                userId_bookId: {
                    userId: userId,
                    bookId: bookId
                }
            }
        })

        if (existingEntry) {
            return res.status(409).json({ error: 'Book already in reading list' })
        }

        // Create new reading list entry
        const readingListItem = await prisma.readingList.create({
            data: {
                bookId: bookId,
                userId: userId
            }
        })

        res.status(201).json({
            message: 'Book added to reading list',
            item: readingListItem
        })
    } catch (error) {
        console.error('Error adding to reading list:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Remove book from reading list
router.delete('/reading-list/:bookId', async (req, res) => {
    try {
        const { bookId } = req.params
        const userId = req.user.id

        const deletedItem = await prisma.readingList.delete({
            where: {
                userId_bookId: {
                    userId: userId,
                    bookId: bookId
                }
            }
        })

        res.status(200).json({
            message: 'Book removed from reading list',
            item: deletedItem
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Book not found in reading list' })
        }
        console.error('Error removing from reading list:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router
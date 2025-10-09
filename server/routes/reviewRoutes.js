import express from 'express'
import prisma from '../prismaClient.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all reviews for a specific post (access : public)
router.get('/books/:bookID', async (req, res) => {
    try {
        const {bookID} = req.params;

        // Get reviews for the book with user information
        const reviews = await prisma.review.findMany({
            where: {
                bookId: bookID // Fixed: should be bookId not bookID
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json(reviews);

    } catch (error) {
        console.error('Error fetching reviews:', error)
        res.status(500).json({error: 'Internal server error'})
    }
})

// Create a new review for a book (access : private)
router.post('/reviews', authMiddleware, async (req, res) => {
    try {
        const {bookID, rating, content} = req.body
        const userID = req.user.id

        // Validate required fields
        if (!bookID || !rating) {
            return res.status(400).json({error: 'BookId and rating are required'})
        }

        // Validate rating range
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({error: 'Rating must be a number between 1 and 5.'});
        }

        // Check if user already reviewed this book
        const existingReview = await prisma.review.findUnique({
            where: {
                userId_bookId: {
                    userId: userID,
                    bookId: bookID
                }
            }
        })

        if (existingReview) {
            return res.status(409).json({error: 'You have already reviewed this book'})
        }

        // Create a new review
        const review = await prisma.review.create({
            data: {
                bookId: bookID,
                userId: userID,
                rating,
                content
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json({
            message: 'Review created successfully',
            review
        })
    } catch (error) {
        console.error('Error creating review:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default router;
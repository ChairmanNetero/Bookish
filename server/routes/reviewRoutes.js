import express from 'express'
import prisma from '../prismaClient.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get all reviews for a specific post (access : public)
router.get('/books/:bookID', async (req, res) => {
    try{
        const {bookID} = req.params;

        // Get reviews for the book with user information
        const reviews = await prisma.review.findMany({
            where: {
                bookID : bookID
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true
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
        res.status(500).json({ error: 'Internal server error' })
    }
})

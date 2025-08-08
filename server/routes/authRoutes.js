import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from '../db'

const router = express.Router()

// Register a new user endpoint
router.post('/SignUp', async (req, res) => {
    const {username, password} = req.body

    // Encrypt password with bcrypt hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
})
import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({error: 'No token provided'})
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7, authHeader.length)
        : authHeader

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.id = decoded.id
        req.email = decoded.email
        next()
    } catch (error) {
        return res.status(401).json({error: 'Invalid token'})
    }
}

export default authMiddleware
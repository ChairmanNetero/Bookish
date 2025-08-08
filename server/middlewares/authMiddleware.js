import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    const token = req.headers.authorization

    if (!token) return res.status(401).send('No token provided')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.id = decoded.id
        req.email = decoded.email
        next()
    } catch (error) {
        return res.status(401).json({error: 'Invalid token.'})
    }
}

export default authMiddleware
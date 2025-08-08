import jwt from 'jsonwebtoken'

function authMiddleware (req, res, next) {
    const token = req.headers.authorization

    if(!token) return res.status(401).send('No token provided')

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).send(err)

        req.id = decoded.id
        next()
    })
}
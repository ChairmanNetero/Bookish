const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
import authRoutes from './routes/authRoutes';

app.use(express.json())

// Create first endpoint
app.get('/', (req, res) => {
    console.log("Welcome!", req.method);
    res.sendStatus(201);
})

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
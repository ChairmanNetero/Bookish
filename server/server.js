import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

// Create first endpoint
app.get('/', (req, res) => {
    console.log("Welcome!", req.method);
    res.sendStatus(201);
})

app.use('/api/', authRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
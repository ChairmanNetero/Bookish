import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration object
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

// Use the cors middleware with the specified options
app.use(cors(corsOptions));
app.use(express.json())


// Create first endpoint
app.get('/', (req, res) => {
    console.log("Welcome!", req.method);
    res.sendStatus(201);
})

app.use('/api/', authRoutes)
app.use('/api/', reviewRoutes)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/storage.js';
import userRouter from './routes/UserRoutes.js';
import checkInRouter from './routes/CheckInRoutes.js';

const app = express();
dotenv.config();

// middlewares
app.use(express.json())
app.use(cors())
app.use('/api/route', userRouter)
app.use('/api/route', checkInRouter)


const port = process.env.PORT
app.listen(port, ()=>[
    connectDB(),
    console.log('Server is running')
])
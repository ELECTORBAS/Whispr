import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './Config/connectDB.js';
import messageRouter from './Routes/messageRoute.js';
import authRoute from './Routes/authRoute.js';

const app = express()
const allowedOrigins = ['http://localhost:5173']

connectDB()

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 4000;

app.use('/api/auth', authRoute)
app.use('/api/messages', messageRouter)

app.listen(PORT, () => console.log(`app is running on Port : ${PORT}`))
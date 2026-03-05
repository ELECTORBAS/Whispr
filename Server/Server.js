import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import router from './Routes/route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import connectDB from './Config/connectDB.js';

const app = express()
const allowedOrigins = ['http://localhost:5173']

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

const PORT = process.env.PORT || 4000;

console.log(process.env.MONGODB_URI);

app.use('/api/auth', router)

app.listen(PORT, () => console.log(`app is running on Port : ${PORT}`))
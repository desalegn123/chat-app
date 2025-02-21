import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './lib/db.js';

import authRouter from './routes/auth.routes.js';
import messageRouter from "./routes/message.route.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json())
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use("/api/message", messageRouter)
app.listen(PORT, (req, res) => {
  console.log('server is runing on port:' + PORT);
  connectDB();
});

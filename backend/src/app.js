import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server, io } from './utils/socket.js';
import path from 'path';
import dotenv from 'dotenv';
import connectDb from './utils/connectDb.js';

const dirname = path.resolve();

dotenv.config();

// Database connection
connectDb();

app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// app.get('/', (req, res) => {
//   res.send('API is working');
// });

// Authentication routes
import authRoutes from './routes/auth.js';
import connectionsRoutes from './routes/connections.js';
import messagesRoutes from './routes/messages.js';

app.use('/api/auth', authRoutes);
app.use('/api/connections', connectionsRoutes);
app.use('/api/messages', messagesRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, '../frontend/dist')));
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(dirname, '../frontend','dist','index.html'));
  });
}

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
 
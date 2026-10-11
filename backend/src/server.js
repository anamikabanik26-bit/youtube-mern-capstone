import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import channelRoutes from './routes/channels.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import { notFound, errorHandler } from './middleware/errors.js';
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.use((req, res, next) => { console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`); next(); });
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'YouTube Clone API is running.' }));
app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
app.use(notFound); app.use(errorHandler);
const PORT = process.env.PORT || 5000;
try { await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/youtube_clone'); console.log('MongoDB connected'); app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`)); }
catch (error) { console.error('Database connection failed:', error.message); process.exit(1); }

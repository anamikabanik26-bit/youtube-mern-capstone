import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Channel from './models/Channel.js';
import Video from './models/Video.js';
import bcrypt from 'bcryptjs';
await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/youtube_clone');
let user = await User.findOne({ email: 'demo@example.com' });
if (!user) user = await User.create({ username: 'Demo Creator', email: 'demo@example.com', password: await bcrypt.hash('Demo123!', 12) });
let channel = await Channel.findOne({ owner: user._id });
if (!channel) channel = await Channel.create({ channelName: 'Code Corner', description: 'Friendly tutorials for curious learners.', owner: user._id });
if (await Video.countDocuments() === 0) await Video.insertMany([
 { title: 'Learn React in 30 Minutes', description: 'A beginner-friendly introduction to React components and props.', videoUrl: 'https://www.youtube.com/embed/Ke90Tje7VS0', thumbnailUrl: 'https://img.youtube.com/vi/Ke90Tje7VS0/hqdefault.jpg', category: 'Education', channel: channel._id, uploader: user._id, views: 15200 },
 { title: 'JavaScript Basics for Beginners', description: 'Variables, functions and useful JavaScript fundamentals.', videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk', thumbnailUrl: 'https://img.youtube.com/vi/W6NZfCO5SIk/hqdefault.jpg', category: 'Education', channel: channel._id, uploader: user._id, views: 23400 },
 { title: 'Build a Website with HTML and CSS', description: 'Start building your first responsive website.', videoUrl: 'https://www.youtube.com/embed/G3e-cpL7ofc', thumbnailUrl: 'https://img.youtube.com/vi/G3e-cpL7ofc/hqdefault.jpg', category: 'Technology', channel: channel._id, uploader: user._id, views: 8400 },
 { title: 'Node.js and Express API Tutorial', description: 'Understand routes, middleware and JSON APIs.', videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE', thumbnailUrl: 'https://img.youtube.com/vi/Oe421EPjeBE/hqdefault.jpg', category: 'Technology', channel: channel._id, uploader: user._id, views: 11900 },
 { title: 'MongoDB in 20 Minutes', description: 'An overview of documents, collections and queries.', videoUrl: 'https://www.youtube.com/embed/2QQGWYe7IDU', thumbnailUrl: 'https://img.youtube.com/vi/2QQGWYe7IDU/hqdefault.jpg', category: 'Science', channel: channel._id, uploader: user._id, views: 6200 },
 { title: 'Study With Me: Focus Session', description: 'A calm focus session for learning and revision.', videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk', thumbnailUrl: 'https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg', category: 'Music', channel: channel._id, uploader: user._id, views: 45200 }
]);
console.log('Seed complete. Demo login: demo@example.com / Demo123!');
await mongoose.disconnect();

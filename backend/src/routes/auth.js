import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
const router = Router();
const publicUser = user => ({ id: user._id, username: user.username, email: user.email, avatar: user.avatar });
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || username.trim().length < 2) return res.status(400).json({ message: 'Username must contain at least 2 characters.' });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: 'Please enter a valid email address.' });
    if (!password || password.length < 6) return res.status(400).json({ message: 'Password must contain at least 6 characters.' });
    if (await User.findOne({ email: email.toLowerCase() })) return res.status(409).json({ message: 'Email is already registered.' });
    const user = await User.create({ username: username.trim(), email, password: await bcrypt.hash(password, 12) });
    res.status(201).json({ message: 'Registration successful. Please log in.', user: publicUser(user) });
  } catch (err) { next(err); }
});
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid email or password.' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: publicUser(user) });
  } catch (err) { next(err); }
});
router.get('/me', protect, async (req, res, next) => {
  try { const user = await User.findById(req.user.id).select('-password'); if (!user) return res.status(404).json({ message: 'User not found.' }); res.json({ user: publicUser(user) }); }
  catch (err) { next(err); }
});
export default router;

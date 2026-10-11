import { Router } from 'express';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { protect } from '../middleware/auth.js';
const router = Router();
router.post('/:videoId', protect, async (req, res, next) => { try { const text = (req.body.text || '').trim(); if (!text) return res.status(400).json({ message: 'Comment cannot be empty.' }); const video = await Video.findById(req.params.videoId); if (!video) return res.status(404).json({ message: 'Video not found.' }); const comment = await Comment.create({ video: video._id, user: req.user.id, text }); await comment.populate('user', 'username'); res.status(201).json({ comment }); } catch (e) { next(e); } });
router.patch('/:id', protect, async (req, res, next) => { try { const comment = await Comment.findOne({ _id: req.params.id, user: req.user.id }); if (!comment) return res.status(404).json({ message: 'Comment not found or not yours.' }); const text = (req.body.text || '').trim(); if (!text) return res.status(400).json({ message: 'Comment cannot be empty.' }); comment.text = text; await comment.save(); await comment.populate('user', 'username'); res.json({ comment }); } catch (e) { next(e); } });
router.delete('/:id', protect, async (req, res, next) => { try { const comment = await Comment.findOneAndDelete({ _id: req.params.id, user: req.user.id }); if (!comment) return res.status(404).json({ message: 'Comment not found or not yours.' }); res.json({ message: 'Comment deleted.' }); } catch (e) { next(e); } });
export default router;

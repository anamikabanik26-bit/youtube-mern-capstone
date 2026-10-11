import mongoose from 'mongoose';
const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true, trim: true, maxlength: 60 },
  description: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  channelBanner: { type: String, default: '' },
  subscribers: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Channel', channelSchema);

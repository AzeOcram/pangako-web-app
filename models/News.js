import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, default: '' },
  summary: { type: String, default: '' },
  body: [{ type: String }],
}, { timestamps: true });

export default mongoose.model('News', newsSchema);

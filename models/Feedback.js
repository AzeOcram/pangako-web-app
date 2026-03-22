import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, default: 'Anonymous' },
  politician: { type: String, required: true },
  type: {
    type: String,
    enum: ['New Evidence', 'New Promise', 'Correction', 'General Feedback'],
    required: true,
  },
  description: { type: String, required: true },
  source: { type: String, required: true },
  date: { type: String },
}, { timestamps: true });

// Auto-set display date before saving
feedbackSchema.pre('save', function(next) {
  this.date = new Date().toLocaleDateString('en-PH', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  next();
});

export default mongoose.model('Feedback', feedbackSchema);

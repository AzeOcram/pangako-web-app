import FeedbackModel from '../models/Feedback.js';

// GET all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create feedback
export const createFeedback = async (req, res) => {
  try {
    const feedback = new FeedbackModel(req.body);
    await feedback.save();
    res.status(201).json({ success: true, data: feedback });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ success: false, message: 'Feedback not found' });
    res.json({ success: true, message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

import NewsModel from '../models/News.js';

// GET all news
export const getAllNews = async (req, res) => {
  try {
    const news = await NewsModel.find().sort({ createdAt: -1 });
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single news by ID
export const getNews = async (req, res) => {
  try {
    const article = await NewsModel.findById(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create news
export const createNews = async (req, res) => {
  try {
    const article = new NewsModel(req.body);
    await article.save();
    res.status(201).json({ success: true, data: article });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE news
export const deleteNews = async (req, res) => {
  try {
    const article = await NewsModel.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

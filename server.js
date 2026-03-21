import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import politicianRoutes from './routes/politicians.js';
import newsRoutes from './routes/news.js';
import feedbackRoutes from './routes/feedback.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve the entire frontend as static files
app.use(express.static(__dirname));

// API Routes
app.use('/api/politicians', politicianRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/feedback', feedbackRoutes);

// Fallback: serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

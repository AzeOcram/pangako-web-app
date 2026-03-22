import express from 'express';
import { getAllFeedback, createFeedback, deleteFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/', getAllFeedback);
router.post('/', createFeedback);
router.delete('/:id', deleteFeedback);

export default router;

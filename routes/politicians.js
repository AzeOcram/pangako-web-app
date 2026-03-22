import express from 'express';
import { getAllPoliticians, getPolitician, createPolitician, updatePolitician, deletePolitician } from '../controllers/politicianController.js';

const router = express.Router();

router.get('/', getAllPoliticians);
router.get('/:id', getPolitician);
router.post('/', createPolitician);
router.put('/:id', updatePolitician);
router.delete('/:id', deletePolitician);

export default router;

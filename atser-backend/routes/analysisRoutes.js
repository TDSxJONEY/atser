import express from 'express';
import analysisController from '../controllers/analysisController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/process', requireAuth, upload.single('resume'), analysisController.processResume);
router.get('/history', requireAuth, analysisController.getHistory);

export default router;
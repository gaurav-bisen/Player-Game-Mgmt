import express from 'express'
const router = express.Router();
import exportController from '../controllers/export.controller.js';

router.post('/games', exportController.exportGames);

router.get('/games/:id', exportController.jobStatus);

export default router;

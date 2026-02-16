import express from 'express'
import playerController from '../controllers/player.controller.js';
import contextMiddleware from '../middlewares/context.middleware.js';

const router = express.Router();

router.post('/',contextMiddleware(true), playerController.createPlayer);

export default router;

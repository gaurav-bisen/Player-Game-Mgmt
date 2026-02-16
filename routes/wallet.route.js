import express from 'express'
import contextMiddleware from '../middlewares/context.middleware.js';
import walletController from '../controllers/wallet.controller.js'

const router = express.Router();

router.post('/create-wallet',contextMiddleware(true), walletController.createWallet);

export default router;

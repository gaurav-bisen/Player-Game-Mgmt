import express from 'express'
import contextMiddleware from '../middlewares/context.middleware.js';
import walletTransactionController from '../controllers/transaction.controller.js'

const router = express.Router();

router.post('/credit',contextMiddleware(true), walletTransactionController.creditWallet);

export default router;

import express from 'express'
import stripeController from '../controllers/stripe.controller.js';
import contextMiddleware from '../middlewares/context.middleware.js';

const router = express.Router();

router.post('/create-checkout-session', contextMiddleware(true), stripeController.createSession);

router.post('/stripe-webhook', contextMiddleware(true), stripeController.stripeWebHook)

router.get('/success', contextMiddleware(false), (req, res) => {
    res.redirect('/success.html');
});

router.get('/cancel', contextMiddleware(false), (req, res) => {
    res.redirect('/cancel.html');
});

export default router;

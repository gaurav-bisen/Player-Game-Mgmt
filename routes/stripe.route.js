import express from 'express'
import stripeController from '../controllers/stripe.controller.js';
const router = express.Router();

router.post('/create-checkout-session', stripeController.createSession);

router.post('/stripe-webhook', stripeController.stripeWebHook)

router.get('/success', (req, res) => {
    res.redirect('/success.html');
});
  
router.get('/cancel', (req, res) => {
    res.redirect('/cancel.html');
});

export default router;

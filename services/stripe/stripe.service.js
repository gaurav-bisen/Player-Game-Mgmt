import stripe from '../../libs/Stripe/stripe.js'
import BaseHandler from '../../utils/baseHandler.js';

class StripeService extends BaseHandler {
    async createCheckoutSession() {
        const { playerId, rupees } = this.args;

        const { transaction } = this.context;
        
        if (!playerId) {
            throw new Error("User ID is required");
        }
        if (!rupees || rupees <= 0) {
            throw new Error("Invalid Amount");
        }

        const scAmount = rupees;
        const gcAmount = rupees * 1000; 

        const session = await stripe.checkout.sessions.create({ //creates payment page
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: `₹${rupees} Package`
                    },
                    unit_amount: rupees * 100 //1 rupee = 100 paisa
                },
                quantity: 1
            }],
            success_url: `${process.env.BACKEND_URL}/api/v1/stripe/success`,
            cancel_url: `${process.env.BACKEND_URL}/api/v1/stripe/cancel`,

            metadata: { //Sticky note attached to payment - Later webhook reads this and credits wallet.
                playerId,
                scAmount: scAmount.toString(),
                gcAmount: gcAmount.toString(),
            }
        })
        return session;
    }
}

export default  StripeService;
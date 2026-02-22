import stripe from '../../libs/Stripe/stripe.js'
import BaseHandler from '../../utils/baseHandler.js';

class StripeService extends BaseHandler {
    async createCheckoutSession() {
        const { data } = this.args;
        const {userId, rupees} = data;
        const { transaction } = this.context;
        
        if (!userId) {
            throw new Error("User ID is required");
        }
        if (!rupees || rupees <= 0) {
            throw new Error("Invalid Amount");
        }

        const scAmount = rupees;
        const gcAmount = rupees * 1000;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: `₹${rupees} Package`
                    },
                    unit_amount: rupees * 100 //convert to paisa
                },
                quantity: 1
            }],
            success_url: `${process.env.BACKEND_URL}/api/v1/stripe/success`,
            cancel_url: `${process.env.BACKEND_URL}/api/v1/stripe/cancel`,
            metadata: {
                userId,
                scAmount: scAmount.toString(),
                gcAmount: gcAmount.toString(),
            }
        })
        return session;
    }
}

export default  StripeService;
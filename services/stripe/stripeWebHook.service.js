import { TRANSACTION_PURPOSE, TRANSACTION_STATUS } from '../../config/constants.js';
import stripe from '../../libs/Stripe/stripe.js'
import BaseHandler from '../../utils/baseHandler.js';
import creditWallet from '../transactions/creditWallet.service.js'

class StripeWebHookService extends BaseHandler {
    async run() {

        const { rawBody, signature } = this.args;
        const {transaction} = this.context;

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                rawBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (error) {
            console.error("Webhook signature verification failed:", error.message);
            throw new Error(`Webhook Error: ${error.message}`);
        }

        //run only checkout.session.completed
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object; 

            //extract meta data
            const playerId = session.metadata.playerId;
            const scAmount = Number(session.metadata.scAmount);
            const gcAmount = Number(session.metadata.gcAmount)

            //credit wallet
            const service = creditWallet.execute({
                data: {
                    userId: playerId,
                    scAmount,
                    gcAmount,
                    purpose: TRANSACTION_PURPOSE.PURCHASE,
                    status: TRANSACTION_STATUS.SUCCESS
                }
            }, {transaction});

            await service.run();
        }
        return true;
    }
}

export default StripeWebHookService
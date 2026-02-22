import { handleResponse } from '../utils/handleResponse.util.js'
import stripeService from '../services/stripe/stripe.service.js';
import stripeWebHookService from '../services/stripe/stripeWebHook.service.js'

class StripeController {
    async createSession(req, res, next) {
        try {
            const service = stripeService.execute({
                data: req.body
            }, req.context)

            const session = await service.createCheckoutSession();

            handleResponse(res, {
                status: 201,
                message: "Stripe Session",
                data: session.url
            });

        } catch (error) {
            next(error)
        }
    }

    async stripeWebHook(req, res, next) {
        try {

            const service = stripeWebHookService.execute({
                rawBody: req.rawBody,
                signature: req.headers["stripe-signature"]
            }, req.context)

            // const signature = req.headers["stripe-signature"];
            // const rawBody = req.rawBody;
            // await stripeWebHookService.handleWebhook({ rawBody, signature });

            await service.run();

            return res.json({ received: true });
        } catch (error) {
            next(error)
        }
    }
}

export default new StripeController();
import CreditWalletService from "../services/transactions/creditWallet.service.js";
import { handleResponse } from '../utils/handleResponse.util.js'

class WalletTransactionController {
    async creditWallet(req, res, next) {
        try {
            const service = CreditWalletService.execute({
                data: req.body
            }, req.context);

            const wallet = await service.run();

            handleResponse(res, {
                status: 200,
                message: "Wallet credited successfully",
                data: wallet,
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new WalletTransactionController();
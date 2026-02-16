import walletHelper from '../services/wallets/wallet.helper.js'
import { handleResponse } from '../utils/handleResponse.util.js'

class WalletController {
    async createWallet(req, res, next) {
        try {
            const service = walletHelper.execute({
                data: req.body
            }, req.context)

            const wallet = await service.run();

            handleResponse(res, {
                status: 200,
                message: " Wallet Ready !",
                data: wallet
            });
        } catch (error) {
            next(error)
        }
    }
}
export default new WalletController();
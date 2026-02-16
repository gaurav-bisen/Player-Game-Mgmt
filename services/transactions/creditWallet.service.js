import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js'
import walletHelper from '../wallets/wallet.helper.js'
import { TRANSACTION_PURPOSE, TRANSACTION_TYPE } from '../../config/constants.js'

class CreditWalletService extends BaseHandler {
    async run() {
        const { data } = this.args;
        const { transaction } = this.context;

        const {
            userId,
            currencyCode,
            amount, 
            purpose,
            referenceId = null,
            description = null,
            staffId = null 
        } = data;

        if (!userId || !currencyCode || !amount || !purpose) {
            throw new Error("userId, currencyCode, amount and purpose are required");
        }

        //get or create wallet
        const walletService = walletHelper.execute(
            { data: { userId, currencyCode } },
            this.context
          );

          const wallet = await walletService.run();

          console.log("------------------", wallet, "-----------------");

        const balanceBefore = Number(wallet.balance);
        const balanceAfter = balanceBefore + amount;

        //create transaction entry
        await db.wallet_transactions.create({
            userId: userId,
            walletId: wallet.id,
            currencyCode: currencyCode,
            type: TRANSACTION_TYPE.CREDIT,
            purpose: purpose,
            amount: amount,
            balanceBefore: balanceBefore,
            balanceAfter: balanceAfter,
            referenceId: referenceId,
            description: description,
            createdByStaffId: staffId
        }, {transaction});

        //update wallet balance
        wallet.balance = balanceAfter;
        await wallet.save({transaction})
    }
}
export default CreditWalletService;
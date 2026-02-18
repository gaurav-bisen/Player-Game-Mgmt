import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js'
import walletHelper from '../wallets/wallet.helper.js'
import { getIo } from '../../libs/Socket/socket.js'
import { CURRENCY_CODE, TRANSACTION_PURPOSE, TRANSACTION_TYPE } from '../../config/constants.js'

class CreditWalletService extends BaseHandler {
    async run() {
        const { data } = this.args;
        const { transaction } = this.context;

        const {
            userId,
            type,
            purpose,
            scAmount = 0,
            gcAmount = 0,
            referenceId = null,
        } = data;

        if (!userId || !purpose) {
            throw new Error("userId and purpose are required");
        }

        // //get or create wallet
        // const walletService = walletHelper.execute(
        //     { data: { userId, currencyCode } },
        //     this.context
        //   );

        //   const wallet = await walletService.run();

        //   console.log("------------------", wallet, "-----------------");

        // const balanceBefore = Number(wallet.balance);
        // const balanceAfter = balanceBefore + amount;

        //get sc wallet

        const scWalletService = walletHelper.execute({
            data: { userId, currencyCode: CURRENCY_CODE.SC }
        }, this.context)

        const scWallet = await scWalletService.run();

        //get gc wallet
        const gcWalletService = walletHelper.execute({
            data: { userId, currencyCode: CURRENCY_CODE.GC }
        }, this.context)

        const gcWallet = await gcWalletService.run();

        // update balances
        if (Number(scAmount) > 0) {
            scWallet.balance = Number(scWallet.balance) + Number(scAmount);
            await scWallet.save({ transaction });
        }

        if (Number(gcAmount) > 0) {
            gcWallet.balance = Number(gcWallet.balance) + Number(gcAmount);
            await gcWallet.save({ transaction });
        }

        //create transaction entry
        await db.wallet_transactions.create({
            userId,
            type: TRANSACTION_TYPE.CREDIT,
            purpose,
            scAmount,
            gcAmount,
            referenceId,
        }, { transaction });

        //emit transactions
        const io = getIo();

        console.log("Emitting socket event to user:", userId);


        io.to(String(userId)).emit("Bonus_Credited_ON_Wallet", {
            type: TRANSACTION_TYPE.CREDIT,
            purpose,
            GC : gcAmount,
            SC: scAmount, 
        })

        return {
            message: "Wallet credited successfully"
        };

    }
}
export default CreditWalletService;
import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

class walletHelper extends BaseHandler {
    async run() {
        const { data } = this.args;
        const { transaction } = this.context;

        if (!data.userId || !data.currencyCode) {
            throw new Error("userId and currencyCode are required");
        }

        // check existing wallet first
        // const existingWallet = await db.wallets.findOne({
        //     where: {
        //         userId: data.userId,
        //         currencyCode: data.currencyCode
        //     },
        //     transaction,
        // });

        // if (existingWallet) {
        //     return {
        //         message: "Wallet Already exists!",
        //         wallet: existingWallet,
        //     };
        // }


        let wallet = await db.wallets.findOne({  //find wallet
            where: {
                userId: data.userId,
                currencyCode: data.currencyCode
            }, transaction
        })

        //create if not exists
        if (!wallet) {
            wallet = await db.wallets.create({
                userId: data.userId,
                currencyCode: data.currencyCode,
                balance: 0
            }, { transaction })
        }

        return wallet;
    }
}

export default walletHelper;
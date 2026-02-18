import db from '../../models/index.js'
import BaseHandler from '../../utils/baseHandler.js';

class walletHelper extends BaseHandler {
    async run() {
        const { data } = this.args;
        const { transaction } = this.context;

        if (!data.userId || !data.currencyCode) {
            throw new Error("userId and currencyCode are required");
        }

        //findone and create
        // let wallet = await db.wallets.findOne({  //find wallet
        //     where: {
        //         userId: data.userId,
        //         currencyCode: data.currencyCode
        //     }, transaction
        // })

        // //create if not exists
        // if (!wallet) {
        //     wallet = await db.wallets.create({
        //         userId: data.userId,
        //         currencyCode: data.currencyCode,
        //         balance: 0
        //     }, { transaction })
        // }

        //upsert
        const [ wallet ] = await db.wallets.upsert({
            userId: data.userId,
            currencyCode: data.currencyCode,
            balance: 0 // only used if wallet doesnt exist
        }, {transaction})

        return wallet;
    }
}

export default walletHelper;
import { BONOUS_TYPE, CURRENCY_CODE, TRANSACTION_PURPOSE } from '../../config/constants.js'
import db from '../../models/index.js'
import creditWallet from '../transactions/creditWallet.service.js'


class WelcomeBonusService {
    async run(userId, context = {}) {

        //check if alredy bonus givem
        const scAlredyGiven = await db.wallet_transactions.findOne({
            where: {
                userId: userId,
                currencyCode: CURRENCY_CODE.SC,
                purpose: TRANSACTION_PURPOSE.WELCOME_BONUS
            }
        })

        if (scAlredyGiven) return;

        const gcAlredyGiven = await db.wallet_transactions.findOne({
            where: {
                userId: userId,
                currencyCode: CURRENCY_CODE.GC,
                purpose: TRANSACTION_PURPOSE.WELCOME_BONUS
            }
        })

        if (gcAlredyGiven) return;

        //get active welcome bonous
        const bonus = await db.bonous.findOne({
            where: {
                bonusType: BONOUS_TYPE.WELCOME_BONUS,
                isActive: true
            }
        })

        if (!bonus) return;

        //give sc
        if (bonus.scAmount > 0) {
            const service = creditWallet.execute({
                data: {
                    userId,
                    currencyCode: CURRENCY_CODE.SC,
                    amount: bonus.scAmount,
                    purpose: TRANSACTION_PURPOSE.WELCOME_BONUS,
                    description: "Signup Welcome Bonous"
                }
            }, context)
            await service.run();
        }
        //give sc
        if (bonus.gcAmount > 0) {
            const service = creditWallet.execute({
                data: {
                    userId,
                    currencyCode: CURRENCY_CODE.GC,
                    amount: bonus.gcAmount,
                    purpose: TRANSACTION_PURPOSE.WELCOME_BONUS,
                    description: "Signup Welcome Bonous"
                }
            }, context)
            await service.run();
        }
    }
}

export default new WelcomeBonusService();
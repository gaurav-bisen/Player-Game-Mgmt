import { TRANSACTION_PURPOSE, BONOUS_TYPE, CURRENCY_CODE } from '../../config/constants.js';
import db from '../../models/index.js'
import creditWallet from '../transactions/creditWallet.service.js'
import { Op } from 'sequelize'

class DailyBonusService {
    async getCurrentMonthDay() {
        const today = new Date();
        return {
            month: today.getMonth() + 1, //js month 0-11
            day: today.getDate(),
            year: today.getFullYear()
        }
    }

    //helper to check bonous already given this year or not
    async hasReceivedBonusThisYear(userId, purpose, year) {
        const record = await db.wallet_transactions.findOne({
            where: {
                userId,
                purpose,
                created_at: {
                    [Op.gte]: new Date(`${year}-01-01`),
                    [Op.lt]: new Date(`${year + 1}-01-01`)
                }
            }
        })
        return !!record; //Return true if record exists(convert into boolean)
    }

    async runBithdayBonus() {
        const { month, day, year } = await this.getCurrentMonthDay();

        //get active birthday bonus
        const bonus = await db.bonous.findOne({
            where: {
                bonusType: BONOUS_TYPE.BIRTHDAY_BONUS,
                isActive: true
            }
        })
        if (!bonus) return;

        //get users whose birthday is today
        const players = await db.players.findAll({
            where: {
                [db.Sequelize.Op.and]: [
                    db.sequelize.where(
                        db.sequelize.literal(`EXTRACT(MONTH FROM "date_of_Birth")`),
                        month
                    ),
                    db.sequelize.where(
                        db.sequelize.literal(`EXTRACT(DAY FROM "date_of_Birth")`),
                        day
                    ),
                ],
            },
        });

        //loop through players
        for (const player of players) {
            const alreadyGiven = await this.hasReceivedBonusThisYear(player.id, BONOUS_TYPE.BIRTHDAY_BONUS, year);

            if (alreadyGiven) continue;

            //give sc
            if (bonus.scAmount > 0) {
                const service = creditWallet.execute({
                    data: {
                        userId: player.id,
                        currencyCode: CURRENCY_CODE.SC,
                        amount: bonus.scAmount,
                        purpose: TRANSACTION_PURPOSE.BIRTHDAY_BONUS,
                        description: "Birthday Bonus !!!"
                    }
                })
                await service.run();
            }
            //give sc
            if (bonus.gcAmount > 0) {
                const service = creditWallet.execute({
                    data: {
                        userId: player.id,
                        currencyCode: CURRENCY_CODE.GC,
                        amount: bonus.gcAmount,
                        purpose: TRANSACTION_PURPOSE.BIRTHDAY_BONUS,
                        description: "Birthday Bonus !!!"
                    }
                })
                await service.run();
            }
        }

    }

    async runAnniversaryBonus() {
        const { month, day, year } = await this.getCurrentMonthDay();

        //get active anniversary bonus
        const bonus = await db.bonous.findOne({
            where: {
                bonusType: BONOUS_TYPE.ANNIVERSARY_BONUS,
                isActive: true
            }
        })
        if (!bonus) return;

        //get users whose anniversary is today
        const players = await db.players.findAll({
            where: {
                [db.Sequelize.Op.and]: [
                    db.sequelize.where(
                        db.sequelize.literal(`EXTRACT(MONTH FROM "created_at")`),
                        month
                    ),
                    db.sequelize.where(
                        db.sequelize.literal(`EXTRACT(DAY FROM "created_at")`),
                        day
                    ),
                ],
            },
        });

        //loop through players
        for (const player of players) {
            const alreadyGiven = await this.hasReceivedBonusThisYear(player.id, BONOUS_TYPE.ANNIVERSARY_BONUS, year);

            if (alreadyGiven) continue;

            //give sc
            if (bonus.scAmount > 0) {
                const service = creditWallet.execute({
                    data: {
                        userId: player.id,
                        currencyCode: CURRENCY_CODE.SC,
                        amount: bonus.scAmount,
                        purpose: TRANSACTION_PURPOSE.ANNIVERSARY_BONUS,
                        description: "Anniversary Bonus !!!"
                    }
                })
                await service.run();
            }
            //give sc
            if (bonus.gcAmount > 0) {
                const service = creditWallet.execute({
                    data: {
                        userId: player.id,
                        currencyCode: CURRENCY_CODE.GC,
                        amount: bonus.gcAmount,
                        purpose: TRANSACTION_PURPOSE.ANNIVERSARY_BONUS,
                        description: "Anniversary Bonus !!!"
                    }
                })
                await service.run();
            }
        }

    }

    async runDailyBonusJob() {
        console.log("Daily bonus job started");

        try {
            await this.runBithdayBonus();
            await this.runAnniversaryBonus()
        } catch (error) {
            console.log("Error running daily bonus job: ", error);
        }
    }
}

export default new DailyBonusService();
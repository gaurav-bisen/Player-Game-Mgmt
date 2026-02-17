import creditWallet from "../transactions/creditWallet.service.js";
import { TRANSACTION_PURPOSE, BONOUS_TYPE } from "../../config/constants.js";
import bonusHelper from "./bonus.helper.js";

class BirthdayBonusService {

  async run() {
    const { month, day, year } = bonusHelper.getCurrentMonthDay();

    //get active birthday bonus
    const bonus = await bonusHelper.getActiveBonus(BONOUS_TYPE.BIRTHDAY_BONUS);

    if (!bonus) return;

    //get users whose birthday is today
    const players = await bonusHelper.getUsersByMonthDay("date_of_Birth", month, day);

    for (const player of players) {
      const alreadyGiven = await bonusHelper.hasReceivedBonusThisYear(
        player.id,
        TRANSACTION_PURPOSE.BIRTHDAY_BONUS,
        year
      );

      if (alreadyGiven) continue;

      const service = creditWallet.execute({
        data: {
          userId: player.id,
          scAmount: bonus.scAmount,
          gcAmount: bonus.gcAmount,
          purpose: TRANSACTION_PURPOSE.BIRTHDAY_BONUS,
          referenceId: bonus.id
        }
      });

      await service.run();
    }
  }
}

export default new BirthdayBonusService();

import creditWallet from "../transactions/creditWallet.service.js";
import { TRANSACTION_PURPOSE, BONOUS_TYPE } from "../../config/constants.js";
import bonusHelper from "./bonus.helper.js";

class AnniversaryBonusService {

  async run() {
    const { month, day, year } = bonusHelper.getCurrentMonthDay();

    //get active anniversary bonus
    const bonus = await bonusHelper.getActiveBonus(BONOUS_TYPE.ANNIVERSARY_BONUS);

    if (!bonus) return;

    //get users whose anniversary is today
    const players = await bonusHelper.getUsersByMonthDay("created_at", month, day);

    for (const player of players) {
      const alreadyGiven = await bonusHelper.hasReceivedBonusThisYear(
        player.id,
        TRANSACTION_PURPOSE.ANNIVERSARY_BONUS,
        year
      );

      if (alreadyGiven) continue;

      const service = creditWallet.execute({
        data: {
          userId: player.id,
          scAmount: bonus.scAmount,
          gcAmount: bonus.gcAmount,
          purpose: TRANSACTION_PURPOSE.ANNIVERSARY_BONUS,
          referenceId: bonus.id
        }
      });

      await service.run();
    }
  }
}

export default new AnniversaryBonusService();

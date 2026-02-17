import db from "../../models/index.js";
import { Op } from "sequelize";

class BonusHelper {

  getCurrentMonthDay() {
    const today = new Date();
    return {
      month: today.getMonth() + 1,
      day: today.getDate(),
      year: today.getFullYear()
    };
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

  async getActiveBonus(bonusType) {
    return db.bonous.findOne({
      where: {
        bonusType,
        isActive: true
      }
    });
  }

  async getUsersByMonthDay(columnName, month, day) {
    return db.players.findAll({
      where: {
        [db.Sequelize.Op.and]: [
          db.sequelize.where(
            db.sequelize.literal(`EXTRACT(MONTH FROM "${columnName}")`),
            month
          ),
          db.sequelize.where(
            db.sequelize.literal(`EXTRACT(DAY FROM "${columnName}")`),
            day
          ),
        ],
      },
    });
  }
}

export default new BonusHelper();

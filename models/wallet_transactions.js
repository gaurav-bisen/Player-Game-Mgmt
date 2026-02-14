'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class wallet_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wallet_transactions.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
    },

    walletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'wallet_id'
    },

    currencyCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      field: 'currency_code'
    },

    type: {
      type: DataTypes.ENUM("CREDIT", "DEBIT"),
      allowNull: false,
    },

    purpose: {
      type: DataTypes.ENUM(
        "purchase",
        "referral_bonus",
        "birthday_bonus",
        "anniversary_bonus",
        "welcome_bonus",
        "admin_bonus",
        "game_win",
        "game_bet",
        "redeem"
      ),
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },

    balanceBefore: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      field: 'balance_before'
    },

    balanceAfter: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      field: 'balance_after'
    },

    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
      field:'reference_id'
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdByStaffId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'created_by_staff_id'
    },
  },
    {
      tableName: "wallet_transactions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true
    }
  );

  return wallet_transactions;
};
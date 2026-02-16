'use strict';
import {CURRENCY_CODE, TRANSACTION_PURPOSE, TRANSACTION_TYPE} from '../config/constants.js'
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class wallet_transactions extends Model {
    
    static associate(models) {
      wallet_transactions.belongsTo(models.players, {
          foreignKey: "user_id",
          as: "user",
        });
      
        wallet_transactions.belongsTo(models.wallets, {
          foreignKey: "wallet_id",
          as: "wallet",
        });
      
        //staff
        wallet_transactions.belongsTo(models.User, {
          foreignKey: "created_by_staff_id",
          as: "staff",
        });
      };
      
    
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
      type: DataTypes.ENUM(...Object.values(CURRENCY_CODE)),
      allowNull: false,
      field: 'currency_code'
    },

    type: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_TYPE)),
      allowNull: false,
    },

    purpose: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_PURPOSE)),
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
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'created_by_staff_id'
    },
  },
    {
      sequelize,
      modelName: "wallet_transactions",
      tableName: "wallet_transactions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true
    }
  );

  return wallet_transactions;
};
'use strict';
import { TRANSACTION_PURPOSE, TRANSACTION_STATUS, TRANSACTION_TYPE } from '../config/constants.js'
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class wallet_transactions extends Model {

    static associate(models) {
      wallet_transactions.belongsTo(models.players, {
        foreignKey: "userId",
        as: "user",
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

    type: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_TYPE)),
      allowNull: false,
    },

    purpose: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_PURPOSE)),
      allowNull: false,
    },

    scAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: 'sc_amount'
    },

    gcAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
      field: 'gc_amount'
    },

    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'reference_id'
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TRANSACTION_STATUS)),
      allowNull: true,
      defaultValue: "pending",
    }
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
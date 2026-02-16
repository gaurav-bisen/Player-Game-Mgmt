'use strict';
import {
  Model
} from 'sequelize';
import { CURRENCY_CODE } from '../config/constants.js';
export default (sequelize, DataTypes) => {
  class wallets extends Model {
    
    static associate(models) {
      wallets.belongsTo(models.players, {
        foreignKey: "user_id",
        as: "user",
      });

      wallets.hasMany(models.wallet_transactions, {
        foreignKey: "wallet_id",
        as: "transactions",
      });
    };
  }
  wallets.init({
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

    currencyCode: {
      type: DataTypes.ENUM(...Object.values(CURRENCY_CODE)),
      allowNull: false,
      field: 'currency_code'
    },

    balance: {
      type: DataTypes.DECIMAL(18, 2),
      defaultValue: 0,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
    {
      sequelize,
      modelName: "wallets",
      tableName: "wallets",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true
    });
  return wallets;
};
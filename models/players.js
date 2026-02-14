'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class players extends Model {
    static associate(models) {
        players.hasMany(models.wallets, {
          foreignKey: "user_id",
          as: "wallets",
        });
      
        players.hasMany(models.wallet_transactions, {
          foreignKey: "user_id",
          as: "walletTransactions",
        });
      
      
    }
  }
  players.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    dateOfBirth: DataTypes.DATEONLY,
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'players',
    tableName: "players",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["email"] },
      { unique: true, fields: ["username"] },
    ],
  });
  return players;
};
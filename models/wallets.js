'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class wallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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
      type: DataTypes.STRING(10),
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
      modelName: "wallets",
      tableName: "wallets",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true
    });
  return wallets;
};
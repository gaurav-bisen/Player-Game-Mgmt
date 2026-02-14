'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class Coin extends Model {

    static associate(models) {
      // define association here
    }
  }
  Coin.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    currencyCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
      field: 'currency_code'
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isRedeemable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_redeemable'

    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    sequelize,
    modelName: 'Coin',
    tableName: "coins",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true
  });
  return Coin;
};
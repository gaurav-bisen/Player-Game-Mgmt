'use strict';
import {
  Model
} from 'sequelize';
import { BONOUS_TYPE } from '../config/constants.js';

export default (sequelize, DataTypes) => {
  class bonous extends Model {
    
    static associate(models) {
        bonous.belongsTo(models.User, {
          foreignKey: "created_by_staff_id",
          as: "createdBy",
        });
    }
  }
  bonous.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bonusType: {
      type: DataTypes.ENUM(...Object.values(BONOUS_TYPE)),
      allowNull: false,
      field: 'bonus_type'
    },

    scAmount: {
      type: DataTypes.DECIMAL(18,2),
      defaultValue: 0,
      field: 'sc_amount'
    },

    gcAmount: {
      type: DataTypes.DECIMAL(18,2),
      defaultValue: 0,
      field: 'gc_amount'
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active'
    },

    termsConditions: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'terms_conditions'
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
    modelName: 'bonous',
    tableName: "bonous",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true
  });
  return bonous;
};
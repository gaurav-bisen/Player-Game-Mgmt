'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class bonous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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

    bonus_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sc_amount: {
      type: DataTypes.DECIMAL(18,2),
      defaultValue: 0,
    },

    gc_amount: {
      type: DataTypes.DECIMAL(18,2),
      defaultValue: 0,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    terms_conditions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_by_staff_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "bonus",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  return bonous;
};
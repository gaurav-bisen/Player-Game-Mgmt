'use strict';
import {
  Model
} from 'sequelize'; 
export default (sequelize, DataTypes) => {
  class Games extends Model {
    
    static associate(models) {
      Games.belongsTo(models.GameCategories, {
        foreignKey: 'categoryId'
      });

      Games.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
    }
  }
  Games.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id'
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "order_index"
    }
  }, {
    sequelize,
    modelName: 'Games',
    tableName: 'games',
    //to set timestamp default
    timestamps: true,  //by this automatically update created_at updated_at
    underscored: true //map camelcase field in migration
  });
  return Games;
};
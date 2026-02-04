'use strict';
import {
  Model
} from 'sequelize'; 
export default (sequelize, DataTypes) => {
  class GameCategories extends Model {
    
    static associate(models) {
      GameCategories.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });

      GameCategories.hasMany(models.Games, {
        foreignKey: 'categoryId'
      });
    }
  }
  GameCategories.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    createdBy: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'GameCategories',
    tableName: 'game_categories',
    //to set timestamp default
    timestamps: true,  //by this automatically update created_at updated_at
    underscored: true //map camelcase field in migration
  });
  return GameCategories;
};
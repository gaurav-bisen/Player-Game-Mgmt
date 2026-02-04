'use strict';
import {
  Model
} from 'sequelize'; 
export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }
  Role.init({
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'Name is required!' },
        notEmpty: { msg: 'Name cannot be empty' }
      }
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Level is required!' },
        notEmpty: { msg: 'Level cannot be empty' }
      }
    },
    permissions: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    }
  },{
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    //to set timestamp default
    timestamps: true,  //by this automatically update created_at updated_at
    underscored: true //map camelcase field in migration
  });
  return Role;
};
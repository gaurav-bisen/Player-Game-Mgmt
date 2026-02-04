'use strict';
import {
  Model
} from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      //store role id in user table
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'Role' });
      //self join
      User.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Name is required!' },
        notEmpty: { msg: 'Name cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: 'Email is required!' },
        notEmpty: { msg: 'Email cannot be empty' },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Password is required!' },
        notEmpty: { msg: 'Password cannot be empty' },
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    permissions: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    //to set timestamp default
    timestamps: true,  //by this automatically update created_at updated_at
    underscored: true //map camelcase field in migration
  });
  return User;
};
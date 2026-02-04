'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    permissions: {
      type: Sequelize.JSONB,
      allowNull: true
    },
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    last_login_at: {
      type: Sequelize.DATE,
      allowNull: true
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}
'use strict';

/** @type {import('sequelize-cli').Migration} */

export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('users', 'created_by', {
    type: Sequelize.INTEGER,
    allowNull: true
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('users', 'created_by', {
    type: Sequelize.INTEGER,
    allowNull: false
  });
}

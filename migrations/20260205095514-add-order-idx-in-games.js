'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("games", "order_index", {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  });
};

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("games", "order_index");
}


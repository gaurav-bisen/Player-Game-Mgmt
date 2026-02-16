'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('wallets', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    currency_code: {
      type: Sequelize.ENUM(
        "GC",
        "SC",
        "RSC",
        "PSC",
      ),
      allowNull: false,
    },

    balance: {
      type: Sequelize.DECIMAL(18, 2),
      defaultValue: 0,
    },

    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },

    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },

    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  // VERY IMPORTANT: One wallet per user per currency
  await queryInterface.addConstraint('wallets', {
    fields: ['user_id', 'currency_code'],
    type: 'unique',
    name: 'unique_user_currency_wallet',
  });

}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('wallets');
}

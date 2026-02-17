'use strict';
import { TRANSACTION_PURPOSE, TRANSACTION_TYPE } from '../config/constants.js'

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('wallet_transactions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    type: {
      type: Sequelize.ENUM(...Object.values(TRANSACTION_TYPE)),
      allowNull: false,
    },

    purpose: {
      type: Sequelize.ENUM(...Object.values(TRANSACTION_PURPOSE)),
      allowNull: false,
    },

    sc_amount: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    gc_amount: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    reference_id: {
      type: Sequelize.STRING,
      allowNull: true,
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('wallet_transactions');
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_wallet_transactions_type";'
  );
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_wallet_transactions_purpose";'
  );
}
"use strict";
import { TRANSACTION_STATUS } from '../config/constants.js'

export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("wallet_transactions", "status", {
    type: Sequelize.ENUM(...Object.values(TRANSACTION_STATUS)),
    allowNull: true,
    defaultValue: "pending",
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("wallet_transactions", "status");

  // drop enum type 
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_transactions_status";'
  );
}

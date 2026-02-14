'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('wallet_transactions', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    wallet_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    currency_code: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },

    type: {
      type: Sequelize.ENUM("CREDIT", "DEBIT"),
      allowNull: false,
    },

    purpose: {
      type: Sequelize.ENUM(
        "purchase",
        "referral_bonus",
        "birthday_bonus",
        "anniversary_bonus",
        "welcome_bonus",
        "admin_bonus",
        "game_win",
        "game_bet",
        "redeem"
      ),
      allowNull: false,
    },

    amount: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: false,
    },

    balance_before: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: false,
    },

    balance_after: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: false,
    },

    reference_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    created_by_staff_id: {
      type: Sequelize.INTEGER,
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
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_wallet_transactions_type";');
}

'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('bonous', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    bonus_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    sc_amount: {
      type: Sequelize.DECIMAL(18,2),
      defaultValue: 0,
    },

    gc_amount: {
      type: Sequelize.DECIMAL(18,2),
      defaultValue: 0,
    },

    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },

    terms_conditions: {
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable('bonous');
}

'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('players', 'google_id', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('players', 'provider', {
      type: Sequelize.ENUM('local', 'google'),
      defaultValue: 'local',
    });

    await queryInterface.changeColumn('players', 'password', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('players', 'google_id');
    await queryInterface.removeColumn('players', 'provider');

    await queryInterface.changeColumn('players', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_players_provider";'
    );
  }
};
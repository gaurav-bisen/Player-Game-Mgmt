'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('game_categories', [
    { name: 'Trending', description: 'Trending games', status: true, created_by: 1, created_at: new Date(), updated_at: new Date() },
    { name: 'Casino', description: 'Casino games', status: true, created_by: 1, created_at: new Date(), updated_at: new Date() },
    { name: 'Table', description: 'Table games', status: true, created_by: 1, created_at: new Date(), updated_at: new Date() },
    { name: 'Sweep slot', description: 'Racing games', status: true, created_by: 1, created_at: new Date(), updated_at: new Date() },
  ], {});
};

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('game_categories', null, {});
}

'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // GAMES INDEXES

  // composite index for category pagination
  await queryInterface.addIndex('games',
    ['category_id', 'created_at'], {
    name: 'idx_games_category_createdAt'
  }
  );

  // foreign key indexes for joins
  await queryInterface.addIndex('games', ['category_id'], {
    name: 'idx_games_categoryId'
  });

  await queryInterface.addIndex('games', ['created_by'], {
    name: 'idx_games_createdBy'
  });

  // sorting
  await queryInterface.addIndex('games', ['created_at'], {
    name: 'idx_games_createdAt'
  });


  // GAME CATEGORIES INDEXES

  await queryInterface.addIndex('game_categories', ['created_by'], {
    name: 'idx_categories_createdBy'
  });

  await queryInterface.addIndex('game_categories', ['created_at'], {
    name: 'idx_categories_createdAt'
  });

  await queryInterface.addIndex('game_categories', ['order_index'], {
    name: 'idx_categories_orderIndex'
  });

}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeIndex('games', 'idx_games_category_createdAt');
  await queryInterface.removeIndex('games', 'idx_games_categoryId');
  await queryInterface.removeIndex('games', 'idx_games_createdBy');
  await queryInterface.removeIndex('games', 'idx_games_createdAt');

  await queryInterface.removeIndex('game_categories', 'idx_categories_createdBy');
  await queryInterface.removeIndex('game_categories', 'idx_categories_createdAt');
  await queryInterface.removeIndex('game_categories', 'idx_categories_orderIndex');
}

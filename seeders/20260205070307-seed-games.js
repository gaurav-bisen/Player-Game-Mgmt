'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up (queryInterface, Sequelize) {

    // Get categories from DB
  const categories = await queryInterface.sequelize.query(
    `SELECT id, name FROM game_categories;`,
    { type: Sequelize.QueryTypes.SELECT }
  );

  // Convert to map → { Trending: 1, Casino: 2 ... }
  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat.name] = cat.id;
  });

  await queryInterface.bulkInsert('games', [

    // TRENDING GAMES
    {
      name: 'Aviator',
      category_id: categoryMap['Trending'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Mines',
      category_id: categoryMap['Trending'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Plinko',
      category_id: categoryMap['Trending'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },

    // CASINO GAMES
    {
      name: 'Blackjack Pro',
      category_id: categoryMap['Casino'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Roulette Royale',
      category_id: categoryMap['Casino'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Baccarat Live',
      category_id: categoryMap['Casino'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },

    // TABLE GAMES
    {
      name: 'Teen Patti',
      category_id: categoryMap['Table'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Poker Texas Holdem',
      category_id: categoryMap['Table'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Andar Bahar',
      category_id: categoryMap['Table'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },

    //SWEEP SLOT GAMES
    {
      name: 'Sweet Bonanza',
      category_id: categoryMap['Sweep slot'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Gates of Olympus',
      category_id: categoryMap['Sweep slot'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Wolf Gold',
      category_id: categoryMap['Sweep slot'],
      created_by: 1,
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }

  ], {});
};

export async function down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('games', null, {});
}

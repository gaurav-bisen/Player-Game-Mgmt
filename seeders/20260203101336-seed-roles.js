'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.bulkInsert('roles', [
    {
      name: 'superadmin',
      level: 1,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update', 'delete'],
        player_management: ['read', 'update', 'delete']
      }),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'admin',
      level: 2,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update', 'delete'],
        player_management: ['create', 'read', 'update', 'delete']
      }),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'manager',
      level: 3,
      permissions: JSON.stringify({
        game_management: ['create', 'read', 'update'],
        player_management: ['create', 'read', 'update']
      }),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'support',
      level: 4,
      permissions: JSON.stringify({
        game_management: [ 'read', 'update'],
        player_management: ['read', 'update']
      }),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('roles', null, {});
}

'use strict';

import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const [rows] = await queryInterface.sequelize.query(
    `SELECT role_id, permissions FROM roles WHERE name = 'superadmin' LIMIT 1;`
  );

  const role = rows[0];

  const password = await bcrypt.hash('Superadmin@123', 10);

  await queryInterface.bulkInsert('users', [
    {
      name: 'Super Admin',
      email: 'superadmin@test.com',
      password,
      role_id: role.role_id,

      // permissions copied from role
      permissions: JSON.stringify(role.permissions),

      created_by: null,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('users', {
    email: 'superadmin@test.com'
  });
}

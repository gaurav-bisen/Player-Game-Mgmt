'use strict';

export default {
  async up(queryInterface, Sequelize) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, "0");
    const dd = today.getDate().toString().padStart(2, "0");

    await queryInterface.bulkInsert('players', [
      {
        username: "test_birthday_user",
        first_name: "Birthday",
        last_name: "User",
        email: "birthday@example.com",
        date_of_Birth: `${yyyy - 25}-${mm}-${dd}`, // birthday today
        phone_number: "1234567890",
        is_verified: true,
        status: "active",
        password: "password123",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "test_anniversary_user",
        first_name: "Anniversary",
        last_name: "User",
        email: "anniversary@example.com",
        date_of_Birth: "1995-01-01", // arbitrary birthday
        phone_number: "0987654321",
        is_verified: true,
        status: "active",
        password: "password123",
        created_at: new Date(`${yyyy - 5}-${mm}-${dd}`), // anniversary date simulated
        updated_at: new Date(),
      },
      {
        username: "test_normal_user",
        first_name: "Normal",
        last_name: "User",
        email: "normal@example.com",
        date_of_Birth: "1990-06-15",
        phone_number: "1112223333",
        is_verified: true,
        status: "active",
        password: "password123",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', {
      email: [
        "birthday@example.com",
        "anniversary@example.com",
        "normal@example.com"
      ]
    });
  }
};

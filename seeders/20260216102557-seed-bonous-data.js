'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bonous", [
      {
        title: "Welcome Bonus",
        bonus_type: "welcome_bonus",
        sc_amount: 5,
        gc_amount: 1000,
        is_active: true,
        terms_conditions: "Given once after email verification",
        description: "Signup reward bonus",
        created_by_staff_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Referral Bonus",
        bonus_type: "referral_bonus",
        sc_amount: 2,
        gc_amount: 500,
        is_active: true,
        terms_conditions: "User gets reward when referral signs up",
        description: "Referral reward bonus",
        created_by_staff_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Birthday Bonus",
        bonus_type: "birthday_bonus",
        sc_amount: 3,
        gc_amount: 3000,
        is_active: true,
        terms_conditions: "Given once every year on birthday",
        description: "Birthday reward bonus",
        created_by_staff_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Anniversary Bonus",
        bonus_type: "anniversary_bonus",
        sc_amount: 3,
        gc_amount: 3000,
        is_active: true,
        terms_conditions: "Given on account anniversary",
        description: "Anniversary reward bonus",
        created_by_staff_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Admin Manual Bonus",
        bonus_type: "admin_bonus",
        sc_amount: 0,
        gc_amount: 0,
        is_active: true,
        terms_conditions: "Given manually by admin/staff",
        description: "Manual admin bonus",
        created_by_staff_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bonous", null, {});
  },
};

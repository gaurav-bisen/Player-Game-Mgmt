'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('coins', [
      {
        
        currency_code: "GC",
        name: "Gold Coins",
        is_redeemable: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        
        currency_code: "SC",
        name: "Sweepstakes Coins",
        is_redeemable: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        
        currency_code: "RSC",
        name: "Restricted Sweepstakes Coins",
        is_redeemable: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        
        currency_code: "PSC",
        name: "Promo Sweepstakes Coins",
        is_redeemable: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('coins', null, {});
  },
};

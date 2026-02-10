'use strict';

import { faker } from '@faker-js/faker';

const STAFF_IDS = [12, 13, 14, 18, 19, 20];
const TOTAL_CATEGORIES = 100;
const TOTAL_GAMES = 1000000;
const BATCH_SIZE = 10000;

/* ------------------ CATEGORY NAME POOL ------------------ */

const igamingCategories = [
  "Slots", "Live Casino", "Crash Games", "Table Games", "Card Games",
  "Roulette", "Blackjack", "Baccarat", "Poker", "Keno",
  "Scratch Cards", "Virtual Sports", "Fantasy Sports", "Arcade",
  "Fishing Games", "Lottery", "Instant Win", "Dice Games",
  "Sports Betting", "Horse Racing", "Greyhound Racing",
  "Esports Betting", "TV Games", "Number Games", "Bingo",
  "Mini Games", "Jackpot Games", "Hold & Win", "Megaways",
  "Multiplier Games", "Bonus Buy", "High RTP", "Low Volatility",
  "High Volatility", "Progressive Slots", "Classic Slots",
  "Video Slots", "3D Slots", "Mobile Slots", "Turbo Games",
  "Crash Multiplier", "Mines", "Plinko", "Tower Games",
  "Hi-Lo", "Wheel Games", "Spin & Win", "Skill Games",
  "PvP Games", "Battle Games"
];

function randomStaff() {
  return STAFF_IDS[Math.floor(Math.random() * STAFF_IDS.length)];
}

function randomCategoryName(i) {
  const base = faker.helpers.arrayElement(igamingCategories);
  return `${base} ${i}`;
}

/* ------------------ SEEDER ------------------ */

export async function up(queryInterface) {

  console.log("Creating 100 categories...");

  /* ---------- CREATE 100 CATEGORIES ---------- */
  const categories = [];

  for (let i = 1; i <= TOTAL_CATEGORIES; i++) {
    categories.push({
      name: randomCategoryName(i),
      description: faker.company.catchPhrase(),
      status: true,
      created_by: randomStaff(),
      order_index: i,
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  await queryInterface.bulkInsert('game_categories', categories);

  console.log("Categories inserted ✓");

  /* ---------- GET CATEGORY IDS ---------- */
  const categoryRows = await queryInterface.sequelize.query(
    `SELECT id FROM game_categories ORDER BY id`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  const categoryIds = categoryRows.map(c => c.id);

  /* ---------- GAME NAME WORD POOL ---------- */
  const gameWords = [
    "Mega", "Ultra", "Super", "Lucky", "Golden", "Wild", "Crazy", "Hot",
    "Royal", "Magic", "Fire", "Ice", "Dragon", "Tiger", "Pirate", "Ninja",
    "Empire", "Kingdom", "Fortune", "Treasure", "Spin", "Win", "Jackpot",
    "Vegas", "Rush", "Storm", "Legend", "Quest", "Bonus", "Multiplier"
  ];

  function randomGameName() {
    return `${faker.helpers.arrayElement(gameWords)} ${faker.helpers.arrayElement(gameWords)} ${faker.number.int({ min: 1, max: 9999 })}`;
  }

  /* ---------- INSERT 1 MILLION GAMES IN BATCHES ---------- */

  console.log("Starting 1,000,000 games insert...");

  let inserted = 0;

  while (inserted < TOTAL_GAMES) {
    const gamesBatch = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
      gamesBatch.push({
        name: randomGameName(),
        category_id: faker.helpers.arrayElement(categoryIds),
        status: true,
        created_by: randomStaff(),
        order_index: faker.number.int({ min: 1, max: 50 }),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    await queryInterface.bulkInsert('games', gamesBatch);

    inserted += BATCH_SIZE;
    console.log(`Inserted ${inserted} / ${TOTAL_GAMES} games`);
  }

  console.log("🎉 1 MILLION GAMES INSERTED");
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete('games', null, {});
  await queryInterface.bulkDelete('game_categories', null, {});
}


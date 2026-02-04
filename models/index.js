'use strict'; //enables strict mode

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import process from 'process'
import { fileURLToPath, pathToFileURL } from 'url';
import configFile from '../config/config.js'

// __dirname & __filename replacement for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {}; //when we create any model , we can acces it in any controller like db.model_name.finall()

//create connection to db
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
  );
}

// Reading all model files automatically
const files = fs
  .readdirSync(__dirname) //synchronously read the contents of a given directory
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.endsWith('.js') &&
      !file.endsWith('.test.js')
    );
  });

for (const file of files) {
  const filePath = path.join(__dirname, file);

  // Required for windows + ESM
  const fileUrl = pathToFileURL(filePath).href;

  const { default: defineModel } = await import(fileUrl);
  const model = defineModel(sequelize, Sequelize.DataTypes);

  db[model.name] = model;
}

Object.keys(db).forEach(modelName => { //if any relationship there it associate with model and use with db
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db; //by this we use db.model.query
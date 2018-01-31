import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import Config from '../config/config';

const basename = path.basename(__dirname);
const dbConfig = Config.defaultGet('/database');

console.log(dbConfig);
const db = {};
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
});

fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

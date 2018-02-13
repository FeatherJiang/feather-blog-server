/*
 * @Introduce: 导入所有模型定义并生成数据表
 * @Author: feather
 * @Date: 2018-02-05 17:26:39
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-13 23:34:28
 */

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import Config from '../config/config';

const basename = path.basename(__filename);
const dbConfig = Config.defaultGet('/database');

const db = {};
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: Sequelize.Op,
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

db.articles.belongsToMany(db.types, {
  through: db.articleTypes,
  foreignKey: 'aid',
  otherKey: 'tid',
});
db.articles.belongsToMany(db.tags, {
  through: db.articleTags,
  foreignKey: 'aid',
  otherKey: 'tid',
});
db.types.belongsToMany(db.articles, {
  through: db.articleTypes,
  foreignKey: 'tid',
  otherKey: 'aid',
});
db.tags.belongsToMany(db.articles, {
  through: db.articleTags,
  foreignKey: 'tid',
  otherKey: 'aid',
});

db.sequelize.sync({ logging: false });

export default db;

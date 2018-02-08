/*
 * @Introduce: 文章类型关系模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:25:34
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-05 17:26:23
 */

export default function (sequelize, DataTypes) {
  const articleTypes = sequelize.define('articleTypes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    aid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'articles',
        key: 'aid',
      },
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'types',
        key: 'tid',
      },
    },
  }, {
    tableName: 'articleTypes',
    classMethods: {
      associate: (models) => {
        articleTypes.belongsTo(models.articles, {
          foreignKey: 'aid',
          targetKey: 'aid',
        });
        articleTypes.belongsTo(models.types, {
          foreignKey: 'tid',
          targetKey: 'tid',
        });
      },
    },
  });
  return articleTypes;
}

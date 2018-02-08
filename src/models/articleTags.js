/*
 * @Introduce: 文章标签关系模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:25:10
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-05 17:26:24
 */

export default function (sequelize, DataTypes) {
  const articleTags = sequelize.define(
    'articleTags', {
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
          model: 'tags',
          key: 'tid',
        },
      },
    },
    {
      tableName: 'articleTags',
      classMethods: {
        associate: (models) => {
          articleTags.belongsTo(models.articles, {
            foreignKey: 'aid',
            targetKey: 'aid',
          });
          articleTags.belongsTo(models.tags, {
            foreignKey: 'tid',
            targetKey: 'tid',
          });
        },
      },
    },
  );
  return articleTags;
}

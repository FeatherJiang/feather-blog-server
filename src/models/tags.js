/*
 * @Introduce: 标签模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:27:18
 * @Last Modified by:   feather
 * @Last Modified time: 2018-02-05 17:27:18
 */

export default function (sequelize, DataTypes) {
  const tags = sequelize.define(
    'tags', {
      tid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'tags',
      classMethods: {
        associate: (models) => {
          tags.hasMany(models.articleTags, {
            foreignKey: 'tid',
            targetKey: 'tid',
          });
        },
      },
    },
  );
  return tags;
}

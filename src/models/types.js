/*
 * @Introduce: 类型模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:27:33
 * @Last Modified by:   feather
 * @Last Modified time: 2018-02-05 17:27:33
 */

export default function (sequelize, DataTypes) {
  const types = sequelize.define(
    'types', {
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
      tableName: 'types',
      classMethods: {
        associate: (models) => {
          types.hasMany(models.articleTypes, {
            foreignKey: 'tid',
            targetKey: 'tid',
          });
        },
      },
    },
  );
  return types;
}

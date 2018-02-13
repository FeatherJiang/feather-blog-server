/*
 * @Introduce: 文章标签关系模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:25:10
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-12 21:53:42
 */

export default function (sequelize, DataTypes) {
  const articleTags = sequelize.define('articleTags', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    aid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return articleTags;
}

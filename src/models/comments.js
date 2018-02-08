/*
 * @Introduce: 文章评论模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:25:57
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-05 17:26:25
 */

export default function (sequelize, DataTypes) {
  const comments = sequelize.define('comments', {
    cid: {
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
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return comments;
}

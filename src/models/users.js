/*
 * @Introduce: 用户模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:27:47
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-14 20:44:08
 */

export default function (sequelize, DataTypes) {
  const users = sequelize.define('users', {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    introduce: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return users;
}

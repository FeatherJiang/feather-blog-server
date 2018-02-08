/*
 * @Introduce: 文章模型定义
 * @Author: feather
 * @Date: 2018-02-05 17:24:49
 * @Last Modified by:   feather
 * @Last Modified time: 2018-02-05 17:24:49
 */

export default function (sequelize, DataTypes) {
  const articles = sequelize.define(
    'articles', {
      aid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uid',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      overview: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      likeNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      watchNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      commentsNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      tableName: 'articles',
      classMethods: {
        associate: (models) => {
          articles.hasMany(models.articlesTypes, {
            foreignKey: 'aid',
            sourceKey: 'aid',
          });
          articles.hasMany(models.articlesTags, {
            foreignKey: 'aid',
            sourceKey: 'aid',
          });
        },
      },
    },
  );
  return articles;
}

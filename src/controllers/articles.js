/*
 * @Introduce: 文章控制器
 * @Author: feather
 * @Date: 2018-02-05 17:23:29
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-16 11:55:29
 */

import statusCode from '../config/statusCode';
import models from '../models';

const { Op } = models.Sequelize;

function parseComments(comments, pid) {
  const list = [];
  for (let i = 0; i < comments.rows.length; i += 1) {
    if (comments.rows[i].pid === pid) {
      const temp = comments.rows[i];
      temp.children = parseComments(comments, comments.rows[i].cid);
      list.push(temp);
    }
  }
  return list;
}

export default {
  async getArticles(request, h) {
    let { key } = request.query;
    const { page, limit, order } = request.query;
    const offset = (page - 1) * limit;
    if (!key) {
      try {
        const articles = await models.articles.findAndCountAll({
          offset,
          limit,
          order: [
            ['createdAt', order],
          ],
          include: [
            { model: models.types },
            { model: models.tags },
          ],
        });
        const res = {
          statusCode: 200,
          message: statusCode.get('/200'),
          data: articles,
        };
        return h.response(res);
      } catch (error) {
        return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
      }
    } else {
      key = `%${key}%`;
    }
    try {
      const articles = await models.articles.findAndCountAll({
        offset,
        limit,
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: key,
              },
            },
            {
              overview: {
                [Op.iLike]: key,
              },
            },
            {
              content: {
                [Op.iLike]: key,
              },
            },
          ],
        },
        order: [
          ['createdAt', order],
        ],
        include: [
          {
            model: models.types,
          },
          {
            model: models.tags,
          },
        ],
      });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: articles,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async postArticles(request, h) {
    const {
      title, overview, content, banner, types, tags,
    } = request.payload;
    try {
      const result = await models.sequelize.transaction(async (t) => {
        const findAsyncList = [];
        for (let i = 0; i < types.length; i += 1) {
          findAsyncList.push(models.types.findOne({
            where: { tid: types[i] },
            transaction: t,
          }));
        }
        for (let i = 0; i < tags.length; i += 1) {
          findAsyncList.push(models.tags.findOne({
            where: { tid: tags[i] },
            transaction: t,
          }));
        }
        const findResults = await Promise.all(findAsyncList);
        findResults.forEach((item) => {
          if (item == null) {
            throw new Error();
          }
        });
        const article = await models.articles.create({
          uid: 1,
          title,
          overview,
          content,
          banner,
        }, { transaction: t });
        const createAsyncList = [];
        const createTypesList = [];
        const createTagsList = [];
        for (let i = 0; i < types.length; i += 1) {
          createTypesList.push({
            aid: article.aid,
            tid: types[i],
          });
        }
        for (let i = 0; i < tags.length; i += 1) {
          createTagsList.push({
            aid: article.aid,
            tid: tags[i],
          });
        }
        createAsyncList.push(models.articleTypes.bulkCreate(createTypesList, { transaction: t }));
        createAsyncList.push(models.articleTags.bulkCreate(createTagsList, { transaction: t }));
        const relationResults = await Promise.all(createAsyncList);
        relationResults.forEach((item) => {
          if (item == null) {
            throw new Error();
          }
        });
        return article;
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: result,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async getArticlesByType(request, h) {
    const { type } = request.params;
    const { page, limit, order } = request.query;
    const offset = (page - 1) * limit;
    try {
      const article = await models.articles.findAndCountAll({
        offset,
        limit,
        order: [
          ['createdAt', order],
        ],
        include: [
          {
            model: models.types,
            where: {
              name: type,
            },
          },
          { model: models.tags },
        ],
      });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: article,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async getArticlesByTag(request, h) {
    const { tag } = request.params;
    const { page, limit, order } = request.query;
    const offset = (page - 1) * limit;
    try {
      const article = await models.articles.findAndCountAll({
        offset,
        limit,
        order: [
          ['createdAt', order],
        ],
        include: [
          { model: models.types },
          {
            model: models.tags,
            where: {
              name: tag,
            },
          },
        ],
      });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: article,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async getArticle(request, h) {
    const { aid } = request.params;
    try {
      const article = await models.articles.findOne({
        where: {
          aid,
        },
        include: [
          { model: models.types },
          { model: models.tags },
        ],
      });
      if (article) {
        await models.articles.update(
          {
            watchNum: article.watchNum + 1,
          },
          {
            where: {
              aid,
            },
          },
        );
      }
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: article,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async putArticle(request, h) {
    const { aid } = request.params;
    const updateData = request.payload;
    const { types, tags } = request.payload;

    try {
      const result = await models.sequelize.transaction(async (t) => {
        const findAsyncList = [];
        for (let i = 0; i < types.length; i += 1) {
          findAsyncList.push(models.types.findOne({
            where: { tid: types[i] },
            transaction: t,
          }));
        }
        for (let i = 0; i < tags.length; i += 1) {
          findAsyncList.push(models.tags.findOne({
            where: { tid: tags[i] },
            transaction: t,
          }));
        }
        const findResults = await Promise.all(findAsyncList);
        findResults.forEach((item) => {
          if (item == null) {
            throw new Error();
          }
        });
        const article = await models.articles.update(
          updateData,
          {
            where: {
              aid,
            },
            returning: true,
            transaction: t,
          },
        );
        const AsyncList = [];
        const createTypesList = [];
        const createTagsList = [];
        for (let i = 0; i < types.length; i += 1) {
          createTypesList.push({
            aid,
            tid: types[i],
          });
        }
        for (let i = 0; i < tags.length; i += 1) {
          createTagsList.push({
            aid,
            tid: tags[i],
          });
        }
        AsyncList.push(models.articleTypes.destroy({ where: { aid }, transaction: t }));
        AsyncList.push(models.articleTags.destroy({ where: { aid }, transaction: t }));
        AsyncList.push(models.articleTypes.bulkCreate(createTypesList, { transaction: t }));
        AsyncList.push(models.articleTags.bulkCreate(createTagsList, { transaction: t }));
        const relationResults = await Promise.all(AsyncList);
        relationResults.forEach((item) => {
          if (item == null) {
            throw new Error();
          }
        });
        return article[1];
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: result,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async putArticleStar(request, h) {
    const { aid } = request.params;
    try {
      const result = await models.sequelize.transaction(async (t) => {
        const oldArticle = await models.articles.findOne({
          attributes: ['starNum'],
          where: {
            aid,
          },
          transaction: t,
        });
        const article = await models.articles.update({
          starNum: oldArticle.starNum + 1,
        }, {
          where: {
            aid,
          },
          returning: true,
          transaction: t,
        });
        return article[1];
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: result,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async delArticleStar(request, h) {
    const { aid } = request.params;
    try {
      await models.sequelize.transaction(async (t) => {
        const oldArticle = await models.articles.findOne({
          attributes: ['starNum'],
          where: {
            aid,
          },
          transaction: t,
        });
        await models.articles.update(
          {
            starNum: (oldArticle.starNum - 1) >= 1 ? oldArticle.starNum - 1 : 0,
          },
          {
            where: {
              aid,
            },
            transaction: t,
          },
        );
      });

      const res = {
        statusCode: 204,
        message: statusCode.get('/204'),
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async getArticleComments(request, h) {
    const { aid } = request.params;
    const { page, limit, order } = request.query;
    const offset = (page - 1) * limit;
    try {
      const result = await models.comments.findAndCountAll({
        limit,
        offset,
        order: [
          ['createdAt', order],
        ],
        where: {
          aid,
        },
      });
      const comments = JSON.parse(JSON.stringify(result));
      const commentList = {
        count: comments.count,
        rows: [],
      };
      for (let i = 0; i < comments.rows.length; i += 1) {
        comments.rows[i].children = [];
      }

      commentList.rows = parseComments(comments, 0);

      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: commentList,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async postArticleComments(request, h) {
    const { aid } = request.params;
    const {
      pid, avatar = '/api/v1/imgs/default/anonymous-avatar.png', name = 'anonymous', email = '', content,
    } = request.payload;
    try {
      const result = await models.sequelize.transaction(async (t) => {
        const comment = await models.comments.create(
          {
            aid,
            pid,
            avatar,
            name,
            email,
            content,
          },
          { transaction: t },
        );
        const article = await models.articles.findOne({
          attributes: ['commentsNum'],
          where: {
            aid,
          },
          transaction: t,
        });
        await models.articles.update(
          {
            commentsNum: article.commentsNum + 1,
          },
          {
            where: {
              aid,
            },
            transaction: t,
          },
        );
        return comment;
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: result,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async delArticleComment(request, h) {
    const { aid, cid } = request.params;
    try {
      await models.sequelize.transaction(async (t) => {
        await models.comments.destroy({
          where: {
            cid,
            aid,
          },
          transaction: t,
        });
        const article = await models.articles.findOne({
          attributes: ['commentsNum'],
          where: {
            aid,
          },
          transaction: t,
        });
        await models.articles.update(
          {
            commentsNum: article.commentsNum - 1,
          },
          {
            where: {
              aid,
            },
            transaction: t,
          },
        );
      });

      const res = {
        statusCode: 204,
        message: statusCode.get('/204'),
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async getArchive(request, h) {
    try {
      const articles = await models.articles.findAll();
      const archiveList = [];
      const archiveObj = {};
      articles.forEach((item) => {
        const date = new Date(item.createdAt);
        const year = date.getFullYear();
        const month = date.getMonth() >= 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
        const archive = `${year}/${month}`;
        if (archiveObj[archive]) {
          archiveObj[archive] += 1;
        } else {
          archiveObj[archive] = 1;
        }
      });
      Object.keys(archiveObj).forEach((item) => {
        const temp = {};
        temp.time = item;
        temp.articleCount = archiveObj[item];
        archiveList.push(temp);
      });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: archiveList,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async getArchiveArticles(request, h) {
    const { year, month } = request.params;
    const { page, limit, order } = request.query;
    const offset = (page - 1) * limit;
    try {
      const startTime = new Date(year, month - 1, 1);
      const endTime = new Date(year, month, 0);
      const articles = await models.articles.findAndCountAll({
        limit,
        offset,
        order: [
          ['createdAt', order],
        ],
        where: {
          createdAt: {
            [Op.between]: [
              startTime,
              endTime,
            ],
          },
        },
        include: [
          { model: models.types },
          { model: models.tags },
        ],
      });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: articles,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
};

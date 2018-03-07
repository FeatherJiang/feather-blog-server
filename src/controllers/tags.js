/*
 * @Introduce: 文章标签控制器
 * @Author: feather
 * @Date: 2018-02-05 17:23:44
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-07 21:32:30
 */

import statusCode from '../config/statusCode';
import models from '../models';

export default {
  async getTags(request, h) {
    try {
      const tags = await models.tags.findAll({
        include: [
          { model: models.articles },
        ],
      });
      for (let i = 0; i < tags.length; i += 1) {
        tags[i].dataValues.articleCount = tags[i].articles.length;
        delete tags[i].dataValues.articles;
      }
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: tags,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async postTags(request, h) {
    const { name } = request.payload;
    try {
      const tags = await models.tags.create({
        name,
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: tags,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async putTag(request, h) {
    const { tid } = request.params;
    const { name } = request.payload;
    try {
      const tags = await models.tags.update(
        {
          name,
        },
        {
          where: {
            tid,
          },
          returning: true,
        },
      );
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: tags[1],
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async delTag(request, h) {
    const { tid } = request.params;
    try {
      await models.tags.destroy({
        where: {
          tid,
        },
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
};

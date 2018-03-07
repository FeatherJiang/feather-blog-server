/*
 * @Introduce: 文章类型控制器
 * @Author: feather
 * @Date: 2018-02-05 17:24:08
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-07 21:33:28
 */

import statusCode from '../config/statusCode';
import models from '../models';

export default {
  async getTypes(request, h) {
    try {
      const types = await models.types.findAll({
        include: [
          { model: models.articles },
        ],
      });
      for (let i = 0; i < types.length; i += 1) {
        types[i].dataValues.articleCount = types[i].articles.length;
        delete types[i].dataValues.articles;
      }
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: types,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async postTypes(request, h) {
    const { name } = request.payload;
    try {
      const types = await models.types.create({
        name,
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: types,
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async putType(request, h) {
    const { tid } = request.params;
    const { name } = request.payload;
    try {
      const types = await models.types.update(
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
        data: types[1],
      };
      return h.response(res);
    } catch (error) {
      return h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
    }
  },
  async delType(request, h) {
    const { tid } = request.params;
    try {
      await models.types.destroy({
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

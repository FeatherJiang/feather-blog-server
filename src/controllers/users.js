/*
 * @Introduce: 用户控制器
 * @Author: feather
 * @Date: 2018-02-05 17:24:31
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-30 19:21:37
 */

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import statusCode from '../config/statusCode';
import models from '../models';

export default {
  async getToken(request, h) {
    const { name, password } = request.payload;
    try {
      const users = await models.users.findOne({
        where: {
          name,
        },
      });
      const sha = crypto.createHash('sha256');
      const verifyPassword = sha.update(password + users.salt).digest('hex');
      let res = {};
      if (verifyPassword === users.password) {
        const token = jwt.sign(
          {
            uid: users.uid,
            name: users.name,
            avatar: users.avatar,
            mail: users.mail,
            url: users.url,
          },
          config.defaultGet('/secret'),
          {
            expiresIn: '1 days',
          },
        );
        res = {
          statusCode: 201,
          message: statusCode.get('/201'),
          data: token,
        };
      } else {
        res = {
          statusCode: 401,
          message: statusCode.get('/401'),
        };
      }
      return h.response(res).code(res.statusCode);
    } catch (error) {
      return h
        .response({ statusCode: 400, error: error.name, message: statusCode.get('/400') })
        .code(400);
    }
  },
  async getUsers(request, h) {
    try {
      const users = await models.users.findAll({ attributes: { exclude: ['password', 'salt'] } });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: users,
      };
      return h.response(res);
    } catch (error) {
      return h
        .response({ statusCode: 400, error: error.name, message: statusCode.get('/400') })
        .code(400);
    }
  },
  async getUser(request, h) {
    const { uid } = request.params;
    try {
      const users = await models.users.findOne({
        attributes: { exclude: ['password', 'salt'] },
        where: {
          uid,
        },
      });
      const res = {
        statusCode: 200,
        message: statusCode.get('/200'),
        data: users,
      };
      return h.response(res);
    } catch (error) {
      return h
        .response({ statusCode: 400, error: error.name, message: statusCode.get('/400') })
        .code(400);
    }
  },
  async putUser(request, h) {
    const { uid } = request.params;
    const updateData = request.payload;
    if (updateData.password) {
      const sha = crypto.createHash('sha256');
      updateData.salt = crypto.randomBytes(128).toString('base64');
      updateData.password = sha.update(updateData.password + updateData.salt).digest('hex');
    }
    try {
      const users = await models.users.update(updateData, {
        where: {
          uid,
        },
        returning: true,
      });
      const res = {
        statusCode: 201,
        message: statusCode.get('/201'),
        data: users[1],
      };
      return h.response(res);
    } catch (error) {
      return h
        .response({ statusCode: 400, error: error.name, message: statusCode.get('/400') })
        .code(400);
    }
  },
};

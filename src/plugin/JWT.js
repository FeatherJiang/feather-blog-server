/*
 * @Introduce: JWT auth plugin
 * @Author: feather
 * @Date: 2018-02-14 20:55:42
 * @Last Modified by: feather
 * @Last Modified time: 2018-04-10 11:43:27
 */

import jwt from 'jsonwebtoken';
import config from '../config/config';
import statusCode from '../config/statusCode';
import models from '../models';

function register(server) {
  server.auth.scheme('jwt', () => ({
    async authenticate(request, h) {
      const { req } = request.raw;
      const { authorization } = req.headers;
      if (!authorization) {
        return h
          .response({
            statusCode: 401,
            error: 'JsonWebTokenError',
            message: statusCode.get('/401'),
          })
          .code(401)
          .takeover();
      }
      const index = authorization.indexOf('Bearer ');
      if (index === -1) {
        return h
          .response({
            statusCode: 401,
            error: 'JsonWebTokenError',
            message: statusCode.get('/401'),
          })
          .code(401)
          .takeover();
      }
      const token = authorization.split(' ')[1];
      try {
        const decoded = jwt.decode(token);
        await models.users.findOne({
          where: {
            uid: decoded.uid,
          },
        });
        jwt.verify(token, config.defaultGet('/secret'));
        return h.continue;
      } catch (error) {
        return h
          .response({ statusCode: 401, error: error.name, message: statusCode.get('/401') })
          .code(401)
          .takeover();
      }
    },
  }));
  server.auth.strategy('management', 'jwt');
}

const name = 'jwt';

export { register, name };

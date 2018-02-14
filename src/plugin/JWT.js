/*
 * @Introduce: JWT auth plugin
 * @Author: feather
 * @Date: 2018-02-14 20:55:42
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-14 22:58:51
 */

import jwt from 'jsonwebtoken';
import config from '../config/config';

function register(server) {
  server.auth.scheme('jwt', () => ({
    authenticate(request, h) {
      const { req } = request.raw;
      const { authorization } = req.headers;
      if (!authorization) {
        return h.unauthenticated();
      }
      const token = authorization.split(' ')[1];
      try {
        jwt.verify(token, config.defaultGet('/secret'));
        return h.authenticated();
      } catch (error) {
        return h.unauthenticated();
      }
    },
  }));
  server.auth.strategy('management', 'jwt');
}

const name = 'jwt';

export { register, name };

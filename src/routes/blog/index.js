/*
 * @Introduce: 博客路由
 * @Author: feather
 * @Date: 2018-02-05 17:31:29
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-08 14:35:04
 */

import users from './users';
import articles from './articles';
import types from './types';
import tags from './tags';
import statusCode from '../../config/statusCode';

function failAction(request, h, error) {
  const response = h.response({ statusCode: 400, error: error.name, message: statusCode.get('/400') }).code(400);
  return response.takeover();
}

function register(server) {
  const routes = [users, articles, types, tags];
  routes.forEach((item) => {
    item.forEach((route) => {
      const router = route;
      router.config.cors = true;
      if (route.config.validate) {
        router.config.validate.failAction = failAction;
      }
    });
    server.route(item);
  });
}

const name = 'blog';

export { register, name };

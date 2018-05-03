/*
 * @Introduce: 后台管理路由
 * @Author: feather
 * @Date: 2018-02-06 10:15:41
 * @Last Modified by: feather
 * @Last Modified time: 2018-04-10 11:57:11
 */

import users from './users';
import articles from './articles';
import types from './types';
import tags from './tags';
import statusCode from '../../config/statusCode';

function failAction(request, h, error) {
  const response = h
    .response({ statusCode: 400, error: error.name, message: statusCode.get('/400') })
    .code(400);
  return response.takeover();
}

function register(server) {
  const routes = [users, articles, types, tags];
  routes.forEach((item) => {
    item.forEach((route) => {
      const router = route;
      router.config.cors = {
        origin: ['*'],
        credentials: true,
      };
      if (route.config.validate) {
        router.config.validate.failAction = failAction;
      }
    });
    server.route(item);
  });
}

const name = 'management';

export { register, name };

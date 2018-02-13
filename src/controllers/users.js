/*
 * @Introduce: 用户控制器
 * @Author: feather
 * @Date: 2018-02-05 17:24:31
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-13 23:51:56
 */

import models from '../models';

export default {
  async getUsers(request, h) {
    try {
      const users = await models.users.findAll({
        attributes: ['uid'],
      });
    } catch (error) {

    }
  },
  getUser(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  putUser(request, h) {
    return h.response({ code: 403 }).code(403);
  },
};

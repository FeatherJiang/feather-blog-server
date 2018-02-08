/*
 * @Introduce: 用户控制器
 * @Author: feather
 * @Date: 2018-02-05 17:24:31
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:41:29
 */

import models from '../models';

export default {
  getUsers(request, h) {
    models.users.findAll({
      attributes: ['uid'],
    }).then((data) => {
      console.log(data);
    });
    return h.response({ code: 403 }).code(403);
  },
  getUser(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  putUser(request, h) {
    return h.response({ code: 403 }).code(403);
  },
};

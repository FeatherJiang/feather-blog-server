/*
 * @Introduce: 文章类型控制器
 * @Author: feather
 * @Date: 2018-02-05 17:24:08
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:43:33
 */

import models from '../models';

export default {
  getTypes(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  putType(request, h) {
    return h.response({ code: 403 }).code(403);
  },
};

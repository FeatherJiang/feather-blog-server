/*
 * @Introduce: 文章标签控制器
 * @Author: feather
 * @Date: 2018-02-05 17:23:44
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:43:50
 */

import models from '../models';

export default {
  getTags(request, h) {
    return h.response({ code: 403 }).code(403);
  },
  putTag(request, h) {
    return h.response({ code: 403 }).code(403);
  },
};

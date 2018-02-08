/*
 * @Introduce: 文章类型路由(blog)
 * @Author: feather
 * @Date: 2018-02-05 17:32:07
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:17:41
 */

import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.types.getTypes,
      tags: ['api', 'blog', 'management'],
    },
    method: 'GET',
    path: '/v1/types',
  },
];

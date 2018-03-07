/*
 * @Introduce: 文章类型路由(blog)
 * @Author: feather
 * @Date: 2018-02-05 17:32:07
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-07 16:18:04
 */

import Controllers from '../../controllers';

export default [
  {
    config: {
      tags: ['api', 'blog', 'management'],
    },
    method: 'GET',
    path: '/api/v1/types',
    handler: Controllers.types.getTypes,
  },
];

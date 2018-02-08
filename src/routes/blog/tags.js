/*
 * @Introduce: 文章标签路由(blog)
 * @Author: feather
 * @Date: 2018-02-05 17:31:56
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:17:35
 */

import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.tags.getTags,
      tags: ['api', 'blog', 'management'],
    },
    method: 'GET',
    path: '/v1/tags',
  },
];

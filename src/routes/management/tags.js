/*
 * @Introduce: 文章标签路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:16:16
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:47:34
 */

import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.tags.putTag,
      tags: ['api', 'management'],
    },
    method: ['PUT', 'PATCH'],
    path: '/v1/tags/{tid}',
  },
];

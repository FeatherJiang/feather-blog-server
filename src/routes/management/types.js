/*
 * @Introduce: 文章类型路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:16:30
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-06 10:50:12
 */

import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.types.putType,
      tags: ['api', 'management'],
    },
    method: ['PUT', 'PATCH'],
    path: '/v1/types/{tid}',
  },
];

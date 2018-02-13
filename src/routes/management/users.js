/*
 * @Introduce: 用户路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:17:07
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-12 13:10:52
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.users.putUser,
      tags: ['api', 'management'],
      validate: {
        params: {
          uid: Joi.number().integer().required(),
        },
      },
    },
    method: ['PUT', 'PATCH'],
    path: '/v1/users/{uid}',
  },
];

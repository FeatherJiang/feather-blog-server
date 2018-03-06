/*
 * @Introduce: 用户路由(blog)
 * @Author: feather
 * @Date: 2018-02-05 17:32:27
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-06 20:09:19
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  // {
  //   config: {
  //     handler: Controllers.users.getUsersInfo,
  //     tags: ['api', 'blog'],
  //     validate: {
  //       query: {
  //         page: Joi.string().required(),
  //         limit: Joi.string().required(),
  //       },
  //     },
  //   },
  //   method: 'GET',
  //   path: '/v1/users',
  // },
  {
    config: {
      tags: ['api', 'blog'],
      validate: {
        params: {
          uid: Joi.number().required(),
        },
      },
    },
    method: 'GET',
    path: '/api/v1/users/{uid}',
    handler: Controllers.users.getUser,
  },
];

/*
 * @Introduce: 用户路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:17:07
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-06 20:09:56
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      tags: ['api', 'management'],
      validate: {
        payload: {
          name: Joi.string().optional(),
          password: Joi.string().optional(),
        },
      },
    },
    method: 'POST',
    path: '/api/v1/token',
    handler: Controllers.users.getToken,
  },
  {
    config: {
      auth: 'management',
      tags: ['api', 'management'],
      validate: {
        headers: {
          Authorization: Joi.string().required(),
        },
        params: {
          uid: Joi.number().integer().required(),
        },
        payload: {
          name: Joi.string().optional(),
          password: Joi.string().optional(),
          avatar: Joi.string().optional(),
          mail: Joi.string().optional(),
          url: Joi.string().optional(),
          introduce: Joi.string().optional(),
        },
      },
    },
    method: ['PUT', 'PATCH'],
    path: '/api/v1/users/{uid}',
    handler: Controllers.users.putUser,
  },
];

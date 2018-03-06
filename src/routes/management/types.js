/*
 * @Introduce: 文章类型路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:16:30
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-06 20:09:49
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.types.postTypes,
      tags: ['api', 'management'],
      validate: {
        payload: {
          name: Joi.string().required(),
        },
      },
    },
    method: 'POST',
    path: '/api/v1/types',
  },
  {
    config: {
      handler: Controllers.types.putType,
      tags: ['api', 'management'],
      validate: {
        params: {
          tid: Joi.number().integer().required(),
        },
        payload: {
          name: Joi.string().required(),
        },
      },
    },
    method: ['PUT', 'PATCH'],
    path: '/api/v1/types/{tid}',
  },
  {
    config: {
      handler: Controllers.types.delType,
      tags: ['api', 'management'],
      validate: {
        params: {
          tid: Joi.number().integer().required(),
        },
      },
    },
    method: 'DELETE',
    path: '/api/v1/types/{tid}',
  },
];

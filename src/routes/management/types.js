/*
 * @Introduce: 文章类型路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:16:30
 * @Last Modified by: feather
 * @Last Modified time: 2018-04-10 11:57:24
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      auth: 'management',
      tags: ['api', 'management'],
      validate: {
        // headers: {
        //   Authorization: Joi.string().required(),
        // },
        payload: {
          name: Joi.string().required(),
        },
      },
    },
    method: 'POST',
    path: '/api/v1/types',
    handler: Controllers.types.postTypes,
  },
  {
    config: {
      auth: 'management',
      tags: ['api', 'management'],
      validate: {
        // headers: {
        //   Authorization: Joi.string().required(),
        // },
        params: {
          tid: Joi.number()
            .integer()
            .required(),
        },
        payload: {
          name: Joi.string().required(),
        },
      },
    },
    method: ['PUT', 'PATCH'],
    path: '/api/v1/types/{tid}',
    handler: Controllers.types.putType,
  },
  {
    config: {
      auth: 'management',
      tags: ['api', 'management'],
      validate: {
        // headers: {
        //   Authorization: Joi.string().required(),
        // },
        params: {
          tid: Joi.number()
            .integer()
            .required(),
        },
      },
    },
    method: 'DELETE',
    path: '/api/v1/types/{tid}',
    handler: Controllers.types.delType,
  },
];

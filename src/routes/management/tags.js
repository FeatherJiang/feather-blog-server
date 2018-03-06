/*
 * @Introduce: 文章标签路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:16:16
 * @Last Modified by: feather
 * @Last Modified time: 2018-03-06 20:09:40
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.tags.postTags,
      tags: ['api', 'management'],
      validate: {
        payload: {
          name: Joi.string().required(),
        },
      },
    },
    method: 'POST',
    path: '/api/v1/tags',
  },
  {
    config: {
      handler: Controllers.tags.putTag,
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
    path: '/api/v1/tags/{tid}',
  },
  {
    config: {
      handler: Controllers.tags.delTag,
      tags: ['api', 'management'],
      validate: {
        params: {
          tid: Joi.number().integer().required(),
        },
      },
    },
    method: 'DELETE',
    path: '/api/v1/tags/{tid}',
  },
];

/*
 * @Introduce: 文章标签路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:16:16
 * @Last Modified by: feather
 * @Last Modified time: 2018-04-10 11:57:57
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
    path: '/api/v1/tags',
    handler: Controllers.tags.postTags,
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
    path: '/api/v1/tags/{tid}',
    handler: Controllers.tags.putTag,
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
    path: '/api/v1/tags/{tid}',
    handler: Controllers.tags.delTag,
  },
];

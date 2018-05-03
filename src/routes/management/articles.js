/*
 * @Introduce: 文章路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:14:59
 * @Last Modified by: feather
 * @Last Modified time: 2018-05-03 22:02:43
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
          title: Joi.string().required(),
          overview: Joi.string().required(),
          content: Joi.string().required(),
          banner: Joi.string().required(),
          types: Joi.array()
            .items(Joi.number().integer())
            .required(),
          tags: Joi.array()
            .items(Joi.number().integer())
            .required(),
        },
      },
    },
    method: 'POST',
    path: '/api/v1/articles',
    handler: Controllers.articles.postArticles,
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
          aid: Joi.number()
            .integer()
            .required(),
        },
        payload: {
          title: Joi.string().optional(),
          overview: Joi.string().optional(),
          content: Joi.string().optional(),
          banner: Joi.string().optional(),
          types: Joi.array()
            .items(Joi.number().integer())
            .optional(),
          tags: Joi.array()
            .items(Joi.number().integer())
            .optional(),
        },
      },
    },
    method: ['PUT', 'PATCH'],
    path: '/api/v1/articles/{aid}',
    handler: Controllers.articles.putArticle,
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
          aid: Joi.number()
            .integer()
            .required(),
        },
      },
    },
    method: ['DELETE'],
    path: '/api/v1/articles/{aid}',
    handler: Controllers.articles.delArticle,
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
          aid: Joi.number()
            .integer()
            .required(),
          cid: Joi.number()
            .integer()
            .required(),
        },
      },
    },
    method: 'DELETE',
    path: '/api/v1/articles/{aid}/comments/{cid}',
    handler: Controllers.articles.delArticleComment,
  },
];

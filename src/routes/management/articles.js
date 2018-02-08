/*
 * @Introduce: 文章路由(management)
 * @Author: feather
 * @Date: 2018-02-06 10:14:59
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-07 14:40:08
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      tags: ['api', 'management'],
      validate: {
        payload: {
          title: Joi.string().required(),
          overview: Joi.string().required(),
          content: Joi.string().required(),
          banner: Joi.string().required(),
          types: Joi.array().required(),
          tags: Joi.array().required(),
        },
      },
    },
    method: ['POST'],
    path: '/v1/articles',
    handler: Controllers.articles.postArticles,
  },
  {
    config: {
      tags: ['api', 'management'],
      validate: {
        params: {
          aid: Joi.string().required(),
        },
        payload: {
          title: Joi.string().optional(),
          overview: Joi.string().optional(),
          content: Joi.string().optional(),
          banner: Joi.string().optional(),
          types: Joi.array().optional(),
          tags: Joi.array().optional(),
        },
      },
    },
    method: ['PUT', 'PATCH'],
    path: '/v1/articles/{aid}',
    handler: Controllers.articles.putArticle,
  },
  {
    config: {
      tags: ['api', 'management'],
      validate: {
        params: {
          aid: Joi.string().required(),
          cid: Joi.string().required(),
        },
      },
    },
    method: 'DELETE',
    path: '/v1/articles/{aid}/comments/{cid}',
    handler: Controllers.articles.delArticleComment,
  },
];

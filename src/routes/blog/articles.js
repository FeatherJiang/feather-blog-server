/*
 * @Introduce: 文章路由(blog)
 * @Author: feather
 * @Date: 2018-02-05 17:31:03
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-13 21:13:07
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        query: {
          page: Joi.number().integer().required(),
          limit: Joi.number().integer().required(),
          order: Joi.string().valid(['ASC', 'DESC']).required(),
          key: Joi.string().optional(),
        },
      },
    },
    method: 'GET',
    path: '/v1/articles',
    handler: Controllers.articles.getArticles,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        params: {
          type: Joi.string().required(),
        },
        query: {
          page: Joi.number().integer().required(),
          limit: Joi.number().integer().required(),
          order: Joi.string().valid(['ASC', 'DESC']).required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/types/{type}/articles',
    handler: Controllers.articles.getArticlesByType,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        params: {
          tag: Joi.string().required(),
        },
        query: {
          page: Joi.number().integer().required(),
          limit: Joi.number().integer().required(),
          order: Joi.string().valid(['ASC', 'DESC']).required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/tags/{tag}/articles',
    handler: Controllers.articles.getArticlesByTag,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        params: {
          aid: Joi.number().integer().required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/articles/{aid}',
    handler: Controllers.articles.getArticle,
  },
  {
    config: {
      tags: ['api', 'blog'],
      validate: {
        params: {
          aid: Joi.number().integer().required(),
        },
      },
    },
    method: 'PUT',
    path: '/v1/articles/{aid}/star',
    handler: Controllers.articles.putArticleStar,
  },
  {
    config: {
      tags: ['api', 'blog'],
      validate: {
        params: {
          aid: Joi.number().integer().required(),
        },
      },
    },
    method: 'DELETE',
    path: '/v1/articles/{aid}/star',
    handler: Controllers.articles.delArticleStar,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        params: {
          aid: Joi.number().integer().required(),
        },
        query: {
          page: Joi.number().integer().required(),
          limit: Joi.number().integer().required(),
          order: Joi.string().valid(['ASC', 'DESC']).required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/articles/{aid}/comments',
    handler: Controllers.articles.getArticleComments,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        params: {
          aid: Joi.number().integer().required(),
        },
        payload: {
          pid: Joi.number().integer().required(),
          avatar: Joi.string().optional(),
          name: Joi.string().optional(),
          mail: Joi.string().optional(),
          content: Joi.string().required(),
        },
      },
    },
    method: 'POST',
    path: '/v1/articles/{aid}/comments',
    handler: Controllers.articles.postArticleComments,
  },
  {
    config: {
      tags: ['api', 'blog'],
    },
    method: 'GET',
    path: '/v1/archive',
    handler: Controllers.articles.getArchive,
  },
  {
    config: {
      tags: ['api', 'blog'],
      validate: {
        params: {
          date: Joi.string().required(),
        },
        query: {
          page: Joi.number().integer().required(),
          limit: Joi.number().integer().required(),
          order: Joi.string().valid(['ASC', 'DESC']).required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/archive/{date}/articles',
    handler: Controllers.articles.getArchiveArticles,
  },
];

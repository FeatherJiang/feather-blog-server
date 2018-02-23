/*
 * @Introduce: 文件路由
 * @Author: feather
 * @Date: 2018-02-15 13:12:40
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-23 16:36:19
 */

import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      state: {
        failAction: 'ignore',
        parse: false,
      },
    },
    method: 'GET',
    path: '/{param*}',
    handler: Controllers.files.getFile,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      validate: {
        params: {
          date: Joi.string().required(),
          name: Joi.string().required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/imgs/{date}/{name}',
    handler: Controllers.files.getImg,
  },
  {
    config: {
      tags: ['api', 'blog', 'management'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form',
        },
      },
      payload: {
        parse: true,
        output: 'stream',
        maxBytes: 3000000,
        allow: 'multipart/form-data',
        timeout: false,
      },
      validate: {
        payload: {
          file: Joi.any().meta({ swaggerType: 'file' }).required().description('Image File'),
        },
      },
    },
    method: 'POST',
    path: '/v1/imgs',
    handler: Controllers.files.postImgs,
  },
];

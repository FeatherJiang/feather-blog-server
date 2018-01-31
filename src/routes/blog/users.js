import Joi from 'joi';
import Controllers from '../../controllers';

export default [
  {
    config: {
      handler: Controllers.users.getUsersInfo,
      tags: ['api', 'blog'],
    },
    method: 'GET',
    path: '/v1/users',
  },
  {
    config: {
      handler: Controllers.users.getUserInfo,
      tags: ['api', 'blog'],
      validate: {
        params: {
          id: Joi.string().required(),
        },
      },
    },
    method: 'GET',
    path: '/v1/users/{id}',
  },
];

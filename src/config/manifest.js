/*
 * @Introduce: hapi插件配置文件
 * @Author: feather
 * @Date: 2018-02-05 17:20:23
 * @Last Modified by: feather
 * @Last Modified time: 2018-02-14 21:42:22
 */

import Confidence from 'confidence';
import Config from './config';
import Pack from '../../package.json';

const defaultCriteria = {
  env: process.env.NODE_ENV || 'development',
};

const manifest = {
  $meta: 'hapi server plugin config',
  server: {
    port: Config.defaultGet('/port'),
  },
  register: {
    plugins: [
      {
        plugin: './plugin/JWT.js',
      },
      {
        plugin: './routes/blog',
      },
      {
        plugin: './routes/management',
      },
      {
        plugin: 'inert',
      },
      {
        plugin: 'vision',
      },
      {
        plugin: 'hapi-swagger',
        options: {
          info: {
            version: Pack.version,
            title: 'feather-blog api document',
            description: 'feather-blog api',
          },
          tags: [
            {
              name: 'blog',
              description: 'blog api',
            },
            {
              name: 'management',
              description: 'management api',
            },
          ],
          basePath: '/v1',
          pathPrefixSize: 2,
        },
      },
    ],
  },
};

const store = new Confidence.Store(manifest);

store.defaultGet = (key, criteria = defaultCriteria) => store.get(key, criteria);
store.defaultMeta = (key, criteria = defaultCriteria) => store.meta(key, criteria);

export default store;

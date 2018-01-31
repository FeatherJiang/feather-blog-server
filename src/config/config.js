import Confidence from 'confidence';

const defaultCriteria = {
  env: process.env.NODE_ENV || 'development',
};

const config = {
  $meta: 'port, database config',
  port: {
    $filter: 'env',
    development: '8080',
    production: '80',
    $default: '8080',
  },
  database: {
    $filter: 'env',
    development: {
      database: 'feather',
      username: 'feather',
      password: null,
      host: '127.0.0.1',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
    production: {
      database: 'postgres',
      username: 'postgres',
      password: null,
      host: '127.0.0.1',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    },
  },
};

const store = new Confidence.Store(config);

store.defaultGet = (key, criteria = defaultCriteria) => store.get(key, criteria);
store.defaultMeta = (key, criteria = defaultCriteria) => store.meta(key, criteria);

export default store;

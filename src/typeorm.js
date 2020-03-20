import { createConnection } from 'typeorm';
import { models } from './models';
import config from './config';

const modelsArr = Object.keys(models).map((key) => models[key]);

export default () => createConnection({
  name: 'default',
  type: 'postgres',
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  logging: true,
  synchronize: true,
  entities: modelsArr,
  subscribers: [
    'dist/subscriber/*.js',
  ],
  migrations: [
    'dist/migration/*.js',
  ],
  cli: {
    entitiesDir: 'dist/entity',
    migrationsDir: 'dist/migration',
    subscribersDir: 'dist/subscriber',
  },
});

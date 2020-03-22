import { createConnection } from 'typeorm';
import  Post  from './models/Post';
import  Category  from './models/Category';

// connection settings are in the "ormconfig.json" file
createConnection({
  name: 'default',
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  entities: [
    Post, Category,
  ],
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
}).then(async (connection) => {
  const category1 = new Category();
  category1.name = 'TypeScript';

  const category2 = new Category();
  category2.name = 'Programming';

  const post = new Post();
  post.title = 'Control flow based type analysis';
  post.text = 'TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.';
  post.categories = [category1, category2];

  await post.save();
  console.log('Post has been saved: ', post);
}).catch((error) => console.log('Error: ', error));

const path = require('path');

const env = require('dotenv-extended').load({
  path: path.join(__dirname, '..', '.env'),
  defaults: path.join(__dirname, '..', '.env.defaults'),
  schema: path.join(__dirname, '..', '.env.schema'),
  errorOnMissing: true,
  includeProcessEnv: true,
  errorOnExtra: true,
});

const config = {
  database: {
    username: env.DB_USER,
    password: env.DB_PASS,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    logging: false,
  },
  env: env.NODE_ENV,
  web: {
    port: env.WEB_PORT,
  },
  ready: false,
  setReadyState(state) {
    this.ready = state;
  },
  getReadyState() {
    return this.ready;
  },
};


export default config;

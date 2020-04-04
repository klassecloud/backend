import Koa from 'koa';
import http from 'http';
import util from 'util';
import bodyParser from 'koa-bodyparser';
import errorHandler from 'koa-better-error-handler';
import cors from '@koa/cors';
import logger from 'koa-pino-logger';
import router from './routes';
import systemRouter from './routes/system';
// const models = require('./models');
import config from './config';
import typeorm from './typeorm';

class Server {
  constructor() {
    const app = new Koa();
    app.use(cors({
      credentials: true,
    }));
    app.use(logger());
    app.context.api = true;
    app.context.onerror = errorHandler;
    app.use(bodyParser());
    app.use(router.routes());
    app.use(systemRouter.routes());
    this.app = app;
    this.server = http.createServer(app.callback());
    this.listen = this.listen.bind(this);
    this.close = this.close.bind(this);
  }

  async listen(port) {
    await util.promisify(this.server.listen).bind(this.server)(port);
  }

  async close() {
    await util.promisify(this.server.close).bind(this.server);
  }
}

const app = new Server();

if (!module.parent) {
  (async () => {
    try {
      await Promise.all([
        typeorm(),
        app.listen(3001),
      ]);
      if (process.send) process.send('ready');
      const { port } = app.server.address();
      console.log(`Server listening on ${port}`);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  })();
}

export default app;
// Request ID
// Request Time
// https://github.com/indexzero/nconf

import Router from '@koa/router';
import AuthService from '../service/authService';

const authRouter = new Router({ prefix: '/auth' });
const authService = new AuthService();

authRouter.post('/register', async (ctx, next) => authService.register(ctx, next));


authRouter.post('/login', async (ctx, next) => authService.login(ctx, next));

export default authRouter;

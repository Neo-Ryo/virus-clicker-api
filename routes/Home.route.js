const Router = require('koa-router');
const homeRouter = new Router();

homeRouter.get('/', async (ctx, next) => {
  ctx.body = 'Welcome on Virus Clicker API!';
});

module.exports = homeRouter;

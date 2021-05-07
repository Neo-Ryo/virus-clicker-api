const Router = require('koa-router');
const userRouter = new Router({ prefix: '/users' });
const User = require('../models/User.model');

userRouter.get('/', async (ctx, next) => {
  const users = await User.findAll();
  ctx.body = users;
});

userRouter.post('/', async (ctx, next) => {
  const { pseudo, team } = ctx.request.body;
  const postUser = await User.create({
    pseudo,
    team,
  });
  ctx.status = 201;
  ctx.body = postUser.uuid;
});

//eraser to remove on final stage
userRouter.get('/users/destroy', async (ctx, next) => {
  const deleteAllUsers = await User.destroy({
    where: {},
  });
  ctx.status = 200;
  ctx.body = 'all deleted';
});

module.exports = userRouter;

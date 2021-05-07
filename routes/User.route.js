const Router = require('koa-router');
const userRouter = new Router({ prefix: '/users' });
const User = require('../models/User.model');

userRouter.get('/', async (ctx, next) => {
  const users = await User.findAll();
  ctx.body = users;
});

userRouter.get('/:uuid', async (ctx, next) => {
  try {
    const { uuid } = ctx.params;
    const oneUser = await User.findByPk(uuid);
    ctx.body = oneUser;
  } catch (error) {
    ctx.status = 404;
    ctx.body = 'user not found';
  }
  // console.log(ctx.params);
});

userRouter.post('/', async (ctx, next) => {
  try {
    const { pseudo, team } = ctx.request.body;
    const postUser = await User.create({
      pseudo,
      team,
    });
    ctx.status = 201;
    ctx.body = postUser;
  } catch (error) {
    ctx.status = 400;
    ctx.body = 'User incorrect or already exist';
  }
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

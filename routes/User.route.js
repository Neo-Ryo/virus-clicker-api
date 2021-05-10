const Router = require('koa-router');
const { increment } = require('../models/Team.model');
const Team = require('../models/Team.model');
const userRouter = new Router();
const User = require('../models/User.model');

userRouter.get('/users', async (ctx, next) => {
  const users = await User.findAll();
  ctx.status = 200;
  ctx.body = users;
});

userRouter.get('/users/:uuid', async (ctx, next) => {
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

userRouter.post('/users', async (ctx, next) => {
  try {
    const { pseudo, team } = ctx.request.body;
    const postUser = await User.create({
      pseudo,
      TeamUuid: team,
    });

    ctx.status = 201;
    ctx.body = postUser;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

userRouter.put('/users/:uuid/click', async (ctx, next) => {
  try {
    const { uuid } = ctx.params;
    console.log(uuid);
    const increment = await User.findByPk(uuid);
    await increment.increment('score');
    ctx.status = 204;
    ctx.body = increment;
  } catch (error) {
    ctx.status = 400;
    console.log(error);
    // ctx.body = error
  }
});

//eraser to remove on final stage
userRouter.delete('/users/destroy', async (ctx, next) => {
  const deleteAllUsers = await User.destroy({ where: {} });
  ctx.status = 200;
  ctx.body = 'all deleted';
});

module.exports = userRouter;

const Router = require('koa-router');
const teamRouter = new Router({ prefix: '/teams' });
const Team = require('../models/Team.model');
const User = require('../models/User.model');
const asso = require('../associations');

teamRouter.get('/', async (ctx, next) => {
  const arrayOfTeams = await Team.findAll({ include: User });
  ctx.status = 200;
  ctx.body = arrayOfTeams;
});

teamRouter.post('/', async (ctx, next) => {
  const { name, logo } = ctx.request.body;
  const postATeam = await Team.create({ name, logo }, { include: User });
  ctx.status = 201;
  ctx.body = postATeam;
});

module.exports = teamRouter;

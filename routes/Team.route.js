const Router = require('koa-router');
const teamRouter = new Router({ prefix: '/teams' });
const Team = require('../models/Team.model');

teamRouter.get('/', async (ctx, next) => {
  const arrayOfTeams = await Team.findAll();
  ctx.body = arrayOfTeams;
});

teamRouter.post('/', async (ctx, next) => {
  const { name, logo } = ctx.request.body;
  const postATeam = await Team.create({ name, logo });
  ctx.body = postATeam;
});

module.exports = teamRouter;

const combineRouters = require('koa-combine-routers');
const homeRouter = require('./Home.route');
const userRouter = require('./User.route');
const teamRouter = require('./Team.route');

const router = combineRouters(homeRouter, userRouter, teamRouter);

module.exports = router;

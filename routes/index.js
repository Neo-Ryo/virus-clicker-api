const combineRouters = require('koa-combine-routers');
const homeRouter = require('./Home.route');
const userRouter = require('./User.route');

const router = combineRouters(homeRouter, userRouter);

module.exports = router;

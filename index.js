require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

const sequelize = require('./sequelize');
require('./associations');

const User = require('./models/User.model');
const Team = require('./models/Team.model');
const bodyParser = require('koa-bodyparser');
const { sync, models } = require('./sequelize');

// const user = require('./models/User.model');

const PORT = 8000;

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('/', async (ctx, next) => {
  ctx.body = 'Welcome on Virus Clicker API!';
});

router.get('/users', async (ctx, next) => {
  const users = await User.findAll();
  ctx.body = users;
});

router.post('/users', async (ctx, next) => {
  const { pseudo, team } = ctx.request.body;
  const postUser = await User.create({
    pseudo,
    team,
  });
  ctx.status = 201;
  ctx.body = postUser.uuid;
});

router.get('/users/destroy', async (ctx, next) => {
  const deleteAllUsers = await User.destroy({
    where: {},
  });
  ctx.status = 200;
  ctx.body = 'all deleted';
});

async function main() {
  try {
    await sequelize.sync({ force: true });
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log('connection has been succesfull');
    });
  } catch (error) {
    console.log('Unable to reach DB', error);
  }
}

main();

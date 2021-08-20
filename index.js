require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const Router = require('@koa/router');
const router = new Router();
// const router = require('./routes');
const User = require('./models/User.model');
const Team = require('./models/Team.model');
const cors = require('@koa/cors');
const PORT = process.env.PORT || 8000;

const sequelize = require('./sequelize');
require('./associations');

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});
const corsOptions = { origin: '*' };
//===> HOME
router.get('/', async (ctx, next) => {
  ctx.body = 'Welcome on Virus Clicker API!';
});
// ===> USERS
router.get('/users', async (ctx, next) => {
  const users = await User.findAll();
  ctx.status = 200;
  ctx.body = users;
});

router.get('/users/:uuid', async (ctx, next) => {
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

router.post('/users', async (ctx, next) => {
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
    ctx.body = error.message;
  }
});

router.put('/users/:uuid/click', async (ctx, next) => {
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
router.delete('/users/destroy', async (ctx, next) => {
  const deleteAllUsers = await User.destroy({ where: {} });
  ctx.status = 200;
  ctx.body = 'all deleted';
});
//===> TEAMS
router.get('/teams', async (ctx, next) => {
  const arrayOfTeams = await Team.findAll({ include: User });
  ctx.status = 200;
  ctx.body = arrayOfTeams;
});

router.post('/teams', async (ctx, next) => {
  try {
    const { name, logo } = ctx.request.body;
    const postATeam = await Team.create({ name, logo }, { include: User });
    if (postATeam) {
      ctx.status = 201;
      ctx.body = postATeam;
    } else {
      throw new Error();
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});
app.use(cors(corsOptions));
app.use(bodyParser());
//this is applying my CORS headers ===> priceless
app.use(router.routes()).use(router.allowedMethods());

(async function main() {
  try {
    //drop tables
    // await User.sync({ force: true });
    // await Team.sync({ force: true });
    await sequelize.sync();
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log('connection has been succesfull');
      console.log('ENVIRONEMENT ==> ', process.env.NODE_ENV);
    });
  } catch (error) {
    console.log('Unable to reach DB', error);
    console.log('ENVIRONEMENT ==> ', process.env.NODE_ENV);
  }
})();

// main();

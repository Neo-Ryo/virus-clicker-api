require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./routes');
// const User = require('./models/User.model');
// const Team = require('./models/Team.model');
const cors = require('@koa/cors');
const PORT = process.env.PORT || 8000;

const sequelize = require('./sequelize');
require('./associations');
const corsOptions = { origin: '*' };
app.use(cors(corsOptions));
app.use(bodyParser());
//this is applying my CORS headers ===> priceless
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});
app.use(router());

async function main() {
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
}

main();

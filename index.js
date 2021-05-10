require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./routes');
const User = require('./models/User.model');
const Team = require('./models/Team.model');
const cors = require('@koa/cors');

const sequelize = require('./sequelize');
require('./associations');

const PORT = process.env.PORT || 8000;

app.use(
  bodyParser({
    extendTypes: {
      json: ['application/x-javascript'], // will parse application/x-javascript type body as a JSON string
    },
  })
);
//this is applying my CORS headers ===> priceless
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});
app.use(router());
// app.use(cors());

async function main() {
  try {
    //drop tables
    // await User.sync({ force: true });
    // await Team.sync({ force: true });
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('reinitialized DB');
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log('connection has been succesfull');
    });
  } catch (error) {
    console.log('Unable to reach DB', error);
  }
}

main();

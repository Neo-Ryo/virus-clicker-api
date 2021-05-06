require('dotenv').config();
const Koa = require('koa');
const app = new Koa();

const sequelize = require('./sequelize');

const PORT = 8000;

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('connection has been succesfull');
  } catch (error) {
    console.log('Unable to reach DB', error);
  }
});

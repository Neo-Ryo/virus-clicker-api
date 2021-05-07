require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = require('./routes');

const sequelize = require('./sequelize');
require('./associations');

const PORT = 8000;

app.use(bodyParser());
app.use(router());

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

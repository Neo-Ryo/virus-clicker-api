const User = require('./models/User.model');
const Team = require('./models/Team.model');

Team.hasMany(User);
User.belongsTo(Team);

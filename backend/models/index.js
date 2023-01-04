const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Duty = require('./duty');
const Date = require('./date');


const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Duty = Duty;
db.Date = Date;


User.init(sequelize);
Duty.init(sequelize);
Date.init(sequelize);


User.associate(db);
Duty.associate(db);
Date.associate(db);

module.exports = db;

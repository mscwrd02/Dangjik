const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Duty = require('./duty');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Duty = Duty;


User.init(sequelize);
Duty.init(sequelize);

User.associate(db);
Duty.associate(db);

module.exports = db;

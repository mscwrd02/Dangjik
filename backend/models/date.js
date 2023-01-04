const Sequelize = require('sequelize');

module.exports = class Date extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
      	type : Sequelize.INTEGER,
				allowNull : false,
				primaryKey: true,
				unique : true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Date',
      tableName: 'dates',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Date.belongsToMany(db.User, {through : 'UserCanDutyOnDate' }); 
  }
};

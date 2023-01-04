const Sequelize = require('sequelize');

module.exports = class UserCanDutyOnDate extends Sequelize.Model {
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
      modelName: 'UserCanDutyOnDate',
      tableName: 'UserCanDutyOnDate',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.UserCanDutyOnDate.belongsTo(db.User);
		db.UserCanDutyOnDate.belongsTo(db.Duty);
  }
};

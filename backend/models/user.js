const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
				primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      score : {
		  type : Sequelize.FLOAT,
		  allowNull : true,
		  defaultValue: 0,
	  },
	  month : {
		  type : Sequelize.INTEGER,
		  allowNull : true,
		  defaultValue : 1,
	  },
	  order : {
		  type : Sequelize.FLOAT,
		  allowNull : true,
		  
	  }
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Duty);
  }
};

const Sequelize = require('sequelize');

module.exports = class Duty extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
			id:{
				type : Sequelize.INTEGER,
				allowNull : false,
				primaryKey: true,
				unique : true,
			},
      date: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      day_or_night: {
        type: Sequelize.ENUM(['day' , 'night']),
        allowNull: false,
      },
	  supervisor : {
		  type : Sequelize.STRING(50),
		  allowNull : true,
	  },
	  good_supervisor : {
		  type : Sequelize.BOOLEAN,
		  allowNull : true,
	  },
	  off : {
		  type : Sequelize.BOOLEAN,
		  allowNull : true,
	  },
	  
      
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Duty',
      tableName: 'dutys',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Duty.belongsTo(db.User);
  }
};

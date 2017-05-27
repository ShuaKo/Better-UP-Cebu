const Sequelize = require('sequelize');
const database = require('./database');

const Teacher = database.define('teacher', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	course_graduated: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	consultation: {
		type: Sequelize.STRING,
		allowNull: true
	}
	
});

database.sync();

module.exports.Teacher = Teacher;
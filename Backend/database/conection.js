const { Sequelize } = require('sequelize');
//ENV
const config = require('../config/config');
//CONECTION TO DATABASE
const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
	host: config.dbHost,
	dialect: 'mysql',
	define: {
		freezeTableName: true,
		raw: true,
	},
	query: {
		raw: true,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((error) => {
		console.log(error);
	});

module.exports = sequelize;

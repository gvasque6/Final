const { DataTypes } = require('sequelize');
const sequelize = require('./conection');
const regionModel = sequelize.define(
	'regions',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{ timestamps: false }
);

module.exports = regionModel;

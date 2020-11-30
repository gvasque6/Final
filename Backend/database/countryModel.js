const { DataTypes } = require('sequelize');
const sequelize = require('./conection');
const regionModel = require('./regionModel');
const countryModel = sequelize.define(
	'countries',
	{
		name: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		regionId: {
			type: DataTypes.INTEGER,
			references: {
				model: regionModel,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{ timestamps: false }
);
countryModel.belongsTo(regionModel, { onDelete: 'cascade' });

module.exports = countryModel;

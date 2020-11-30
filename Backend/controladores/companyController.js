const companyModel = require('../database/companyModel');
const cityModel = require('../database/cityModel');
const countryModel = require('../database/countryModel');
const sequelize = require('../database/conection');

const obtenerTodas = () => {
	return new Promise((res, rejc) => {
		companyModel
			.findAll({
				attributes: [
					'name',
					'id',
					'address',
					'phone',
					'email',
					'cityId',
					[sequelize.col('city.name'), 'city_name'],
					[sequelize.col('city.countryId'), 'country_id'],
					[sequelize.col('city.country.name'), 'country_name'],
				],
				include: [{ model: cityModel, attributes: [], include: [{ model: countryModel, attributes: [] }] }],
				raw: true,
			})
			.then((companies) => {
				res(companies);
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const obtenerUna = (id) => {
	return new Promise((res, rejc) => {
		companyModel
			.findByPk(id)
			.then((company) => {
				if (company) {
					res({ company: company });
				} else {
					rejc({ status: 404, message: `El usuario  no xiste` });
				}
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

const crearCompañia = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.phone || !data.cityId || !data.email || !data.address) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			companyModel
				.create(data)
				.then((company) => {
					res({ message: 'Compañia creada con exito' });
				})
				.catch((error) => {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		}
	});
};

const actualizarCompañia = (id, data) => {
	return new Promise((res, rejc) => {
		companyModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res({ message: 'La compañia fue actualizada' });
				} else {
					rejc({ status: 400, message: 'No se Pudo actualizar la compañia.' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
			});
	});
};
const eliminarCompañia = (id) => {
	return new Promise((res, rejc) => {
		companyModel
			.destroy({ where: { id: id } })
			.then((response) => {
				if (response === 1) {
					res({ message: 'Compañia eliminada' });
				} else {
					rejc({ status: 400, message: 'La compañia no existe o no puede ser eliminada' });
				}
			})
			.then((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

module.exports = {
	obtenerTodas,
	obtenerUna,
	crearCompañia,
	actualizarCompañia,
	eliminarCompañia,
};

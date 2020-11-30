const cityModel = require('../database/cityModel');
const countryModel = require('../database/countryModel');
const regionModel = require('../database/regionModel');

//GET
const getAllRegions = () => {
	return new Promise((res, rejc) => {
		regionModel
			.findAll()
			.then((response) => {
				res({ regions: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const getAllCountries = () => {
	return new Promise((res, rejc) => {
		countryModel
			.findAll()
			.then((response) => {
				res({ countries: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const getAllCities = () => {
	return new Promise((res, rejc) => {
		cityModel
			.findAll()
			.then((response) => {
				res({ cities: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

const getCountriesByRegion = (idRegion) => {
	return new Promise((res, rejc) => {
		countryModel
			.findAll({ where: { regionId: idRegion } })
			.then((response) => {
				res({ countries: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const getCitiesByCountry = (idCountry) => {
	return new Promise((res, rejc) => {
		cityModel
			.findAll({ where: { countryId: idCountry } })
			.then((response) => {
				res({ cities: response });
			})
			.catch((error) => {
				console.log(error);
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

// GET BY ID
const getByIdRegion = (id) => {
	return new Promise((res, rejc) => {
		regionModel
			.findByPk(id)
			.then((response) => {
				res({ region: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

const getByIdCountry = (id) => {
	return new Promise((res, rejc) => {
		countryModel
			.findByPk(id)
			.then((response) => {
				res({ country: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const getByIdCity = (id) => {
	return new Promise((res, rejc) => {
		cityModel
			.findByPk(id)
			.then((response) => {
				res({ city: response });
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

//CREATE
const createRegion = (data) => {
	return new Promise((res, rejc) => {
		if (data.name) {
			regionModel
				.create(data)
				.then((response) => {
					res({ message: 'Region creada con exito' });
				})
				.catch((error) => {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		} else {
			rejc({ status: 400, message: 'Falta el nombre de la region' });
		}
	});
};
const createCountry = (data) => {
	return new Promise((res, rejc) => {
		if (data.name && data.regionId) {
			countryModel
				.create(data)
				.then((response) => {
					res({ message: 'Pais creado con exito' });
				})
				.catch((error) => {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		} else {
			rejc({ status: 400, message: 'Falta el id de la region o el nombre de el pais' });
		}
	});
};
const createCity = (data) => {
	return new Promise((res, rejc) => {
		if (data.name && data.countryId) {
			cityModel
				.create(data)
				.then((response) => {
					res({ message: 'Ciudad creada con exito' });
				})
				.catch((error) => {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		} else {
			rejc({ status: 400, message: 'Falta el id de la region o el nombre de el pais' });
		}
	});
};
//UPDATE BY ID
const updateRegionById = (id, data) => {
	return new Promise((res, rejc) => {
		regionModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res({ message: 'La region fue actualizado' });
				} else {
					rejc({ status: 400, message: 'No se actualizo la region.' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
			});
	});
};
const updateCountryById = (id, data) => {
	return new Promise((res, rejc) => {
		countryModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res({ message: 'El pais fue actualizado' });
				} else {
					rejc({ status: 400, message: 'No se actualizo el pais.' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
			});
	});
};
const updateCityById = (id, data) => {
	return new Promise((res, rejc) => {
		cityModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res({ message: 'La ciudad fue actualizado' });
				} else {
					rejc({ status: 400, message: 'No se actualizo la ciudad.' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
			});
	});
};

//DELETE BY ID
const deleteRegion = (id) => {
	return new Promise((res, rejc) => {
		if (id) {
			regionModel
				.destroy({ where: { id: id } })
				.then((response) => {
					res({ message: 'Region eliminada con exito' });
				})
				.catch((error) => {
					console.log(error);
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		} else {
			rejc({ status: 400, message: 'Falta el id de la region' });
		}
	});
};
const deleteCountry = (id) => {
	return new Promise((res, rejc) => {
		if (id) {
			countryModel
				.destroy({ where: { id: id } })
				.then((response) => {
					res({ message: 'Pais eliminado con exito' });
				})
				.catch((error) => {
					console.log(error);
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		} else {
			rejc({ status: 400, message: 'Falta el id de  el pais' });
		}
	});
};
const deleteCity = (id) => {
	return new Promise((res, rejc) => {
		if (id) {
			cityModel
				.destroy({ where: { id: id } })
				.then((response) => {
					res({ message: 'Ciudad eliminada con exito' });
				})
				.catch((error) => {
					rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
				});
		} else {
			rejc({ status: 400, message: 'Falta el id la ciudad' });
		}
	});
};

module.exports = {
	getAllRegions,
	getAllCountries,
	getAllCities,
	getCitiesByCountry,
	getCountriesByRegion,
	createRegion,
	createCountry,
	createCity,
	deleteRegion,
	deleteCountry,
	deleteCity,
	getByIdRegion,
	getByIdCountry,
	getByIdCity,
	updateRegionById,
	updateCountryById,
	updateCityById,
};

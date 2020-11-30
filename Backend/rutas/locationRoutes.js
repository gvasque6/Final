const express = require('express');
const autenticate = require('../middlewares/autenticacion');
const autorization = require('../middlewares/autorizacion');

const {
	getAllRegions,
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
	getAllCities,
	getAllCountries,
} = require('../controladores/locationController');

const router = express.Router();

router.get('/regiones', autenticate, (req, res) => {
	getAllRegions()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/ciudades', autenticate, (req, res) => {
	getAllCities()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/paiss', autenticate, (req, res) => {
	getAllCountries()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:region/paises', autenticate, (req, res) => {
	let { region } = req.params;
	getCountriesByRegion(region)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:country/ciudades', autenticate, (req, res) => {
	let { country } = req.params;
	getCitiesByCountry(country)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.get('/region/:id', autenticate, (req, res) => {
	const { id } = req.params;
	getByIdRegion(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/pais/:id', autenticate, (req, res) => {
	const { id } = req.params;
	getByIdCountry(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/ciudad/:id', autenticate, (req, res) => {
	const { id } = req.params;
	getByIdCity(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/region/crear', autenticate, (req, res) => {
	createRegion(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/pais/crear', autenticate, (req, res) => {
	createCountry(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/ciudad/crear', autenticate, (req, res) => {
	createCity(req.body)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.patch('/region/actualizar/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateRegionById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.patch('/pais/actualizar/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateCountryById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.patch('/ciudad/actualizar/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	updateCityById(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.delete('/region/eliminar/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteRegion(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/pais/eliminar/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteCountry(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/ciudad/eliminar/:id', autenticate, (req, res) => {
	const { id } = req.params;
	deleteCity(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
module.exports = router;

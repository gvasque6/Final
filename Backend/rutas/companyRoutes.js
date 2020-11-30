const express = require('express');
const autenticate = require('../middlewares/autenticacion');
const autorization = require('../middlewares/autorizacion');

const {
	obtenerTodas,
	obtenerUna,
	actualizarCompañia,
	eliminarCompañia,
	crearCompañia,
} = require('../controladores/companyController');

//USERS ROUTES
const router = express.Router();

router.get('/todos', autenticate, (req, res) => {
	obtenerTodas()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
	obtenerUna(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/crear', autenticate, (req, res) => {
	const reqUser = req.body;
	crearCompañia(reqUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.patch('/actualizar/:id', autenticate, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	actualizarCompañia(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/eliminar/:id', autenticate, (req, res) => {
	const { id } = req.params;
	eliminarCompañia(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;

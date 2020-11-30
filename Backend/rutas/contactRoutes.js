const express = require('express');
const autenticate = require('../middlewares/autenticacion');

const {
	obtenerTodos,
	obtenerUno,
	actualizarContacto,
	eliminarContacto,
	crearContacto,
} = require('../controladores/contactController');

const router = express.Router();

router.get('/todos', autenticate, (req, res) => {
	obtenerTodos()
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.get('/:id', (req, res) => {
	const { id } = req.params;
	obtenerUno(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/crear', autenticate, (req, res) => {
	const reqUser = req.body;
	crearContacto(reqUser)
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
	console.log(data);
	actualizarContacto(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/eliminar/', autenticate, (req, res) => {
	const data = req.body;
	eliminarContacto(data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;

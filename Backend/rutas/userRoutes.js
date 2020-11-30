const express = require('express');
const autenticate = require('../middlewares/autenticacion');
const autorization = require('../middlewares/autorizacion');

const {
	crearUsuario,
	loginUsuario,
	actualizarUsuario,
	eliminarUsuario,
	obtenerTodos,
	obtenerUsuario,
} = require('../controladores/usercontroller');

const router = express.Router();

router.get('/todos', autenticate, autorization, (req, res) => {
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
	obtenerUsuario(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

router.post('/crear', autenticate, autorization, (req, res) => {
	const reqUser = req.body;
	crearUsuario(reqUser)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.post('/login', (req, res) => {
	const { password, email } = req.body;
	loginUsuario(password, email)
		.then((jwt) => {
			res.status(200).json(jwt);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.patch('/actualizar/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	const data = req.body;
	console.log(data);
	actualizarUsuario(id, data)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});
router.delete('/eliminar/:id', autenticate, autorization, (req, res) => {
	const { id } = req.params;
	eliminarUsuario(id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(error.status).json({ message: error.message });
		});
});

module.exports = router;

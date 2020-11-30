const jwt = require('jsonwebtoken');
const userModel = require('../database/userModel');
const config = require('../config/config');

const obtenerTodos = () => {
	return new Promise((res, rejc) => {
		userModel
			.findAll({ attributes: { exclude: ['password'] } })
			.then((users) => {
				res(users);
			})
			.catch((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};
const obtenerUsuario = (id) => {
	return new Promise((res, rejc) => {
		userModel
			.findByPk(id, { attributes: { exclude: ['password'] } })
			.then((user) => {
				if (user) {
					res({ user: user });
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

const crearUsuario = (data) => {
	return new Promise((res, rejc) => {
		if (!data.name || !data.password || !data.last_name || !data.email) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			userModel
				.create(data)
				.then((user) => {
					delete user.dataValues.password;
					res({ message: 'usuario creado con exito' });
				})
				.catch((error) => {
					if (error.fields.email) {
						rejc({ status: 400, message: 'Este email ya esta registrado' });
					} else {
						rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
					}
				});
		}
	});
};
const loginUsuario = (recibed_password, recibed_email) => {
	return new Promise(async (res, rejc) => {
		if (!recibed_email || !recibed_password) {
			rejc({ status: 400, message: 'Faltan campos, por favor envielos' });
		} else {
			let user = await userModel.findOne({
				where: { email: recibed_email },
				raw: true,
			});
			if (user && user.password === recibed_password) {
				delete user.password;
				res({
					token: jwt.sign(user, config.jwtsecret, {
						expiresIn: '1h',
					}),
				});
			} else {
				rejc({ status: 401, message: `Usuario ó Contraseña incorrectos` });
			}
		}
	});
};
const actualizarUsuario = (id, data) => {
	return new Promise((res, rejc) => {
		userModel
			.update(data, { where: { id: id } })
			.then((response) => {
				if (response[0] === 1) {
					res({ message: 'El usuario fue actualizado' });
				} else {
					rejc({ status: 400, message: 'No se Pudo actualizar el usuario.' });
				}
			})
			.catch((error) => {
				rejc({ status: 500, message: 'Intente de nuevo mas tarde.' });
			});
	});
};
const eliminarUsuario = (id) => {
	return new Promise((res, rejc) => {
		userModel
			.destroy({ where: { id: id } })
			.then((response) => {
				if (response === 1) {
					res({ message: 'Usuario eliminado' });
				} else {
					rejc({ status: 400, message: 'el Usuario no existe o no puede ser eliminado' });
				}
			})
			.then((error) => {
				rejc({ status: 500, message: 'UPS!! tenemos problemas intenta de nuevo mas tarde' });
			});
	});
};

module.exports = {
	obtenerTodos,
	obtenerUsuario,
	crearUsuario,
	loginUsuario,
	actualizarUsuario,
	eliminarUsuario,
};

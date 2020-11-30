let data = parseJwt(window.localStorage.getItem('token'));
let token = JSON.parse(window.localStorage.getItem('token')).token;

if (!data || !data.isAdmin) {
	window.location = '/';
} else {
	fetch('http://localhost:3000/usuario/todos', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	}).then(async (response) => {
		let data = await response.json();
		console.log(data);
		if (response.status === 200) {
			let container = document.getElementById('user-list');
			container.innerHTML = '';
			data.forEach((user) => {
				let { id, name, last_name, email, isAdmin } = user;
				if (!isAdmin) {
					isAdmin = 'No';
				} else {
					isAdmin = 'Si';
				}
				let template = `<div class="users-list-item row">
				<div class="col-md-4 mb-2 mb-md-0">
					<p>Nombre</p>
					<p>${name} ${last_name}</p>
				</div>
				<div class="col-md-3 mb-2 mb-md-0">
					<p>correo</p>
					<p>${email}</p>
				</div>
				<div class="col-md-2 mb-2 mb-md-0">
					<p>Admin</p>
					<p>${isAdmin}</p>
				</div>
				<div class="col-md-3 users-list-item-buttons">
					<button class="btn btn-danger mr-2" onClick="deleteUser(${id})">Eliminar</button>
					<button class="btn btn-primary" onClick="editUser(${id})">Editar</button>
				</div>
			</div>`;
				container.insertAdjacentHTML('beforeend', template);
			});
		} else if (response.status === 500) {
			alert(data.message);
		} else {
			window.location = '/';
		}
	});
}
const deleteUser = (id) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	fetch(`http://localhost:3000/usuario/eliminar/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status !== 200) {
				showAlert(data.message);
			} else if (response.status === 200) {
				window.location = '/usuarios.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

let form = document.getElementById('modal-newUser-form');

form.addEventListener('submit', (e) => {
	validateForm(e);
});
const validateForm = (e) => {
	e.preventDefault();
	let form = e.target;
	let inputs = e.target.querySelectorAll('input, select');
	let passInput = document.getElementById('passInput');
	let confirmPass = document.getElementById('confirmPassInput');
	let sendForm = true;
	for (let i = 0; i < inputs.length; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert('Por favor llene todos los campos');
		}
		if (inputs[i].name === 'email') {
			let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
			if (!regex.test(value)) {
				sendForm = false;
				hideAlert(form);
				showAlert(form, 'Email invalido');
			}
		}
	}
	if (passInput.value !== confirmPass.value) {
		sendForm = false;
		hideAlert();
		showAlert('Las contraseñas no coinciden');
	}
	if (sendForm) {
		hideAlert();
		fetchUser(inputs);
	}
};
const fetchUser = (inputs) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	let data = {};
	for (let i = 0; i < inputs.length - 1; i++) {
		data = { ...data, [inputs[i].name]: inputs[i].value };
	}
	fetch('http://localhost:3000/usuario/crear', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status !== 200) {
				showAlert(data.message);
			} else if (response.status === 200) {
				window.location = '/usuarios.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

function showAlert(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}
function showAlertSuccess(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-success">${text}</small>`);
	}
}
function hideAlert() {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}
const editUser = (id) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	let form = document.getElementById('modal-editUser-form');
	fetch(`http://localhost:3000/usuario/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status !== 200) {
				showAlertEdit(data.message);
			} else if (response.status === 200) {
				putValues(data, form);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
function putValues(data, form) {
	let inputs = form.querySelectorAll('input ,select');
	if (data.isAdmin === 0) {
		data.user.isAdmin = false;
	} else {
		data.user.isAdmin = true;
	}
	for (let i = 0; i < inputs.length; i++) {
		switch (inputs[i].name) {
			case 'name':
				inputs[i].value = data.user.name;
				break;
			case 'last_name':
				inputs[i].value = data.user.last_name;

				break;
			case 'email':
				inputs[i].value = data.user.email;
				break;
			case 'isAdmin':
				inputs[i].value = data.user.isAdmin;
				break;

			default:
				break;
		}
	}
	$('#modal-editUser').modal('show');
	const { id } = data.user;
	form.addEventListener('submit', (e) => {
		validateFormEdit(e, id);
	});
}
const validateFormEdit = (e, id) => {
	e.preventDefault();
	let form = e.target;
	let inputs = e.target.querySelectorAll('input, select');
	let passInput = document.getElementById('passInput');
	let confirmPass = document.getElementById('confirmPassInput');
	let sendForm = true;
	for (let i = 0; i < inputs.length - 2; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlertEdit('Por favor llene todos los campos');
		}
		if (inputs[i].name === 'email') {
			let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
			if (!regex.test(value)) {
				sendForm = false;
				hideAlert(form);
				showAlert(form, 'Email invalido');
			}
		}
	}
	if (passInput.value !== confirmPass.value) {
		sendForm = false;
		hideAlertEdit();
		showAlertEdit('Las contraseñas no coinciden');
	}
	if (sendForm) {
		hideAlertEdit();
		updateUser(inputs, id);
	}
};
const updateUser = (inputs, id) => {
	let token = JSON.parse(window.localStorage.getItem('token')).token;
	let data = {};
	for (let i = 0; i < inputs.length - 1; i++) {
		data = { ...data, [inputs[i].name]: inputs[i].value };
	}
	fetch(`http://localhost:3000/usuario/actualizar/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();

			if (response.status !== 200) {
				showAlertEdit(data.message);
			} else if (response.status === 200) {
				window.location = '/usuarios.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
function showAlertEdit(text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}
function hideAlertEdit() {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}

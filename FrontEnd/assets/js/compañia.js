let formCreate = document.getElementById('modal-newCompany-form');

formCreate.addEventListener('submit', (e) => {
	validateFormCreate(e);
});

const validateFormCreate = (e) => {
	e.preventDefault();
	let form = e.target;
	let inputs = form.querySelectorAll('select, input');
	let sendForm = true;
	for (let i = 0; i < inputs.length; i++) {
		const value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'Por favor llene todos los campos');
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
	if (sendForm) {
		let data = {};
		for (let i = 0; i < inputs.length; i++) {
			data = { ...data, [inputs[i].name]: inputs[i].value };
		}
		hideAlert(form);
		createCompany(data, form);
	}
};
const createCompany = (data, form) => {
	fetch(`http://localhost:3000/compania/crear`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(data),
	})
		.then(async (response) => {
			let data = await response.json();
			console.log(data);
			if (response.status === 200) {
				window.location = '/companias.html';
			} else if (response.status === 401) {
				window.location = '/';
			} else {
				showAlert(form, data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

function showAlert(form, text) {
	let child = form.getElementsByTagName('small');
	if (!child.length) {
		form.insertAdjacentHTML('beforeend', `<small class="text-danger">${text}</small>`);
	}
}

function hideAlert(form) {
	let child = form.getElementsByTagName('small');
	if (child.length) {
		child[0].remove();
	}
}

const editCompany = (id) => {
	fetch(`http://localhost:3000/compania/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				console.log(data);
				let form = document.getElementById('modal-editCompany-form');
				let inputs = form.querySelectorAll('input, select');
				for (let i = 0; i < inputs.length; i++) {
					console.log(inputs[i].name);
					switch (inputs[i].name) {
						case 'cityId':
							let options = inputs[i].querySelectorAll('option');
							for (let i = 0; i < options.length; i++) {
								if (parseInt(options[i].value) === data.company.cityId) {
									options[i].selected = true;
								}
							}
							break;
						case 'name':
							inputs[i].value = data.company.name;
							break;
						case 'address':
							inputs[i].value = data.company.address;
							break;
						case 'phone':
							inputs[i].value = data.company.phone;
							break;
						case 'email':
							inputs[i].value = data.company.email;
							break;

						default:
							break;
					}
				}
				$('#modal-editCompany').modal('show');
				form.addEventListener('submit', (e) => {
					validateFormEditCompany(e, id);
				});
			} else if (response.status === 401) {
				window.location = '/';
			} else {
				showAlert(form, data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
const validateFormEditCompany = (e, id) => {
	e.preventDefault();
	let form = e.target;
	let inputs = form.querySelectorAll('select, input');
	let sendForm = true;
	for (let i = 0; i < inputs.length; i++) {
		const value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'Por favor llene todos los campos');
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
	if (sendForm) {
		let data = {};
		for (let i = 0; i < inputs.length; i++) {
			data = { ...data, [inputs[i].name]: inputs[i].value };
		}
		hideAlert(form);
		companyEdit(data, form, id);
	}
};
const companyEdit = (data, form, id) => {
	fetch(`http://localhost:3000/compania/actualizar/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 401) {
				window.location = '/';
			} else if (response.status === 200) {
				window.location = '/companias.html';
			} else {
				showAlert(form, data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};
const deleteCompany = (idCompany) => {
	$('#modal-deleteCompany').modal('show');
	let button = document.getElementById('btn-delete-company');
	button.addEventListener('click', () => {
		companyDelete(idCompany);
	});
};

const companyDelete = (companyId) => {
	fetch(`http://localhost:3000/compania/eliminar/${companyId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/companias.html';
			} else if (response.status === 401) {
				window.location = '/';
			} else {
				alert(data.message);
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

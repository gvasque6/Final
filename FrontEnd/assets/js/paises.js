const addCountry = (idRegion) => {
	$('#modal-newCountry').modal('show');
	let form = document.getElementById('modal-newCountry-form');
	form.addEventListener('submit', (e) => {
		validateFormCoun(e, idRegion);
	});
};
const validateFormCoun = (e, idRegion) => {
	e.preventDefault();
	let input = e.target.querySelectorAll('input')[0];
	let form = e.target;
	if (!input.value) {
		showAlert(form, 'Por favor ingrese el nombre de el pais');
	} else {
		let data = {
			regionId: idRegion,
			name: input.value,
		};
		hideAlert(form);
		sendCountry(data, form);
	}
};
const sendCountry = (data, form) => {
	fetch(`http://localhost:3000/localizacion/pais/crear`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(data),
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/region.html';
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
const deleteCountry = (idCountry) => {
	$('#modal-deleteCountry').modal('show');
	let button = document.getElementById('btn-delete-country');
	button.addEventListener('click', () => {
		countryDelete(idCountry);
	});
};

const countryDelete = (countryId) => {
	fetch(`http://localhost:3000/localizacion/pais/eliminar/${countryId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				window.location = '/region.html';
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
const editCountry = (id) => {
	fetch(`http://localhost:3000/localizacion/pais/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				let form = document.getElementById('modal-editCountry-form');
				let inputs = form.querySelectorAll('input, select');
				for (let i = 0; i < inputs.length; i++) {
					switch (inputs[i].name) {
						case 'regionId':
							let options = inputs[i].querySelectorAll('option');
							for (let i = 0; i < options.length; i++) {
								if (parseInt(options[i].value) === data.country.regionId) {
									options[i].selected = true;
								}
							}
							break;

						default:
							inputs[i].value = data.country.name;
							break;
					}
				}
				$('#modal-editCountry').modal('show');
				form.addEventListener('submit', (e) => {
					validateFormEditCount(e, id);
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
const validateFormEditCount = (e, id) => {
	e.preventDefault();
	let sendForm = true;
	let form = e.target;
	let inputs = e.target.querySelectorAll('input, select');

	for (let i = 0; i < inputs.length; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'El campo no puede estar vacio');
		}
	}

	if (sendForm) {
		let data = {
			regionId: inputs[0].value,
			name: inputs[1].value,
		};
		hideAlert(form);
		countryEdit(data, form, id);
	}
};
const countryEdit = (data, form, id) => {
	fetch(`http://localhost:3000/localizacion/pais/actualizar/${id}`, {
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
				showAlert(form, data.message);
			} else if (response.status === 200) {
				window.location = '/region.html';
			}
		})
		.catch((error) => {
			console.log(error);
		});
};

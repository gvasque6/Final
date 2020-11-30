let formNewReg = document.getElementById('modal-newRegion-form');

formNewReg.addEventListener('submit', (e) => {
	validateFormReg(e);
});
const validateFormReg = (e) => {
	e.preventDefault();
	let sendForm = true;
	let form = e.target;
	let inputs = e.target.querySelectorAll('input');
	for (let i = 0; i < inputs.length; i++) {
		let value = inputs[i].value;
		if (!value) {
			sendForm = false;
			showAlert(form, 'Debe ingresar el nombre de la nueva region');
		}
	}
	if (sendForm) {
		hideAlert(form);
		createRegion(inputs, form);
	}
};

const createRegion = (inputs, form) => {
	let data = {};
	for (let i = 0; i < inputs.length; i++) {
		data = { ...data, [inputs[i].name]: inputs[i].value };
	}
	fetch(`http://localhost:3000/localizacion/region/crear`, {
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
const deleteRegion = (idRegion) => {
	$('#modal-deleteRegion').modal('show');
	let button = document.getElementById('btn-delete-region');
	button.addEventListener('click', () => {
		regionDelete(idRegion);
	});
};

const regionDelete = (regionId, form) => {
	fetch(`http://localhost:3000/localizacion/region/eliminar/${regionId}`, {
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
const editRegion = (id) => {
	fetch(`http://localhost:3000/localizacion/region/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	})
		.then(async (response) => {
			let data = await response.json();
			if (response.status === 200) {
				let form = document.getElementById('modal-editRegion-form');
				let input = form.querySelectorAll('input')[0];
				input.value = data.region.name;
				$('#modal-EditRegion').modal('show');
				form.addEventListener('submit', (e) => {
					validateFormEditReg(e, id);
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
const validateFormEditReg = (e, id) => {
	e.preventDefault();
	let sendForm = true;
	let form = e.target;
	let input = e.target.querySelectorAll('input')[0];

	let value = input.value;
	if (!value) {
		sendForm = false;
		showAlert(form, 'El campo no puede estar vacio');
	}

	if (sendForm) {
		let data = {
			name: input.value,
		};
		hideAlert(form);
		regionEdit(data, form, id);
	}
};
const regionEdit = (data, form, id) => {
	fetch(`http://localhost:3000/localizacion/region/actualizar/${id}`, {
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

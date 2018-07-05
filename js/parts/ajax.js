function ajax() {

	//AJAX 

	let statusMessage = document.createElement('div'),
	 		mainForm = document.querySelectorAll('.main_form'),
	 		form = document.querySelectorAll('.form'),
	 		formCalc = document.getElementsByClassName('form_calc')[0],
	 		formCalcNameInput = document.querySelector('.name_input'),
	 		formCalcPhoneInput = document.querySelector('.phone_input'),
	 		formControl = document.getElementsByClassName('form-control'),
 		  calcObject = {
 		  	type: 0,
 				width: 0,
 				height: 0,
 				viewType: 0,
 				warmingType: 0,
 				name: '',
 				phone: ''
 			};
	 		
	statusMessage.classList.add('status');

	function ajax(formData, input, isJsonData) {
		let message = new Object();
		message.loading = 'Загрузка...';
		message.success = 'Спасибо! Скоро мы с вами свяжемся';
		message.error = 'Что-то пошло не так...';
		
		let request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		if (isJsonData) {
			request.setRequestHeader("Content-Type", "application/json");// для Json
		} else {
			request.setRequestHeader("Content-Type", "application/x-ww-form-urlencoded");// кодировка для правильной передачи данных для FormData
		}
		
		request.send(formData);

		request.onreadystatechange = function() {         
			if (request.readyState < 4) {
				statusMessage.innerHTML = message.loading;
			} else if (request.readyState === 4) {
				if (request.status == 200 && request.status < 300) {
					statusMessage.innerHTML = message.success;
					setTimeout(function() {
						statusMessage.innerHTML = '';
					}, 2000);
				} else {
					statusMessage.innerHTML = message.error;
				}
			}
		} 

		for (let i = 0; i < input.length; i++) {
			input[i].value = ''; 
		}
	}

	// Calc form

	formCalc.addEventListener('submit', function(event) {
		event.preventDefault();
		formCalc.appendChild(statusMessage);

		calcObject.name = formCalcNameInput.value;
		calcObject.phone = formCalcPhoneInput.value;
		console.log('calcObject3:', calcObject);

		ajax(JSON.stringify(calcObject), formControl, true);
	});

	// Forms on the page

	for (let i = 0; i < mainForm.length; i++) {
		let input = mainForm[i].getElementsByTagName('input');
		mainForm[i].addEventListener('submit', function(event) {
			event.preventDefault();
			mainForm[i].appendChild(statusMessage);

			let formData = new FormData(mainForm[i]);
			ajax(formData, input, false);
		});
	}

	// Forms in popups

	for (let i = 0; i < form.length; i++) {
		let input = form[i].getElementsByTagName('input');
		form[i].addEventListener('submit', function(event) {
			event.preventDefault();
			form[i].appendChild(statusMessage);

			let formData = new FormData(form[i]);
			ajax(formData, input, false);
		});
	}
}

module.exports = ajax;
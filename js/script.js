// Popups

let popup_engineer_btn = document.getElementsByClassName('popup_engineer_btn'),
		popup_engineer = document.querySelector('.popup_engineer'),
		popup_close = document.getElementsByClassName('popup_close'),
		phone_link = document.getElementsByClassName('phone_link'),
		popup = document.querySelector('.popup');

function openPopup(elClick, el) {
	for (let i = 0; i < elClick.length; i++) {
		elClick[i].addEventListener('click', function() {
			el.style.display = 'block';
		});	
	}	
}

function closePopup(elClose, el) {
	for (let i = 0; i < elClose.length; i++) {
		elClose[i].addEventListener('click', function() {
			el.style.display = 'none';
		});	
	}

	el.addEventListener('click', function(event) {
		el.style.display = 'none';

		let target = event.target;
		while (target != el) {
			if (target.tagName == 'FORM') {
				el.style.display = 'block';
			}
			target = target.parentNode;
		}
	});
}

openPopup(popup_engineer_btn, popup_engineer);
openPopup(phone_link, popup);
closePopup(popup_close, popup_engineer);
closePopup(popup_close, popup);

// Tabs

let glazing_block = document.getElementsByClassName('glazing_block'),
		glazing_content = document.getElementsByClassName('glazing_content'),
		glazing_slider = document.getElementsByClassName('glazing_slider')[0],
		glazingLink = document.getElementsByClassName('glazing_link'),
		decorationContentItem = document.getElementsByClassName('decoration_content_item'),
		decorationSlider = document.getElementsByClassName('decoration_slider')[0],
		decorationLinkTitle = document.getElementsByClassName('decoration_link_title'),
		decorationLink = document.getElementsByClassName('decoration_link'),
		activeIndex = 0,
		activeBalconImgIndex = 0,
		activeDecorationIndex = 0;

glazing_content[0].classList.add('active');

glazing_slider.addEventListener('click', function(event) {
	let target = event.target;

	if (target.parentElement.classList.contains('glazing_block')) {
		for (let i = 0; i < glazingLink.length; i++) {
			if (target == glazingLink[i]) {
				changeActiveBlock(i);
			}
		}
	}
});

function changeActiveBlock(clickedIndex) {
	glazingLink[activeIndex].classList.remove('active');
	glazingLink[clickedIndex].classList.add('active');

	glazing_content[activeIndex].classList.remove('active');
	glazing_content[clickedIndex].classList.add('active');

	activeIndex = clickedIndex;
}

decorationContentItem[0].classList.add('active');

decorationSlider.addEventListener('click', function(event) {
	let target = event.target;
	
	if (target.parentElement.classList.contains('decoration_link_title')) {
		for (let i = 0; i < decorationLink.length; i++) {
			if (target == decorationLink[i]) {
				changeActiveDecorationBlock(i);
			}
		}
	}
});

function changeActiveDecorationBlock(clickedIndex) {
	decorationLinkTitle[activeDecorationIndex].classList.remove('after_click');
	decorationLinkTitle[clickedIndex].classList.add('after_click');

	decorationContentItem[activeDecorationIndex].classList.remove('active');
	decorationContentItem[clickedIndex].classList.add('active');

	activeDecorationIndex = clickedIndex;
}

// Popup_calc

let glazing_price_btn = document.getElementsByClassName('glazing_price_btn'),
		popupCalc =  document.querySelector('.popup_calc'),
		balconIcons = document.getElementsByClassName('balcon_icons')[0],
		balconImg = document.getElementsByClassName('balcon_img'),
		balconBigImg = document.getElementsByClassName('balcon_big_img'),
		formControl = document.getElementsByClassName('form-control'),
		popupCalcButton = document.querySelector('.popup_calc_button'),
		popupCalcProfile = document.querySelector('.popup_calc_profile'),
		popupCalcClose = document.querySelector('.popup_calc_close'),
		popupCalcProfileButton = document.querySelector('.popup_calc_profile_button'),
		popupCalcEnd =  document.querySelector('.popup_calc_end'),
		popupCalcProfileClose = document.querySelector('.popup_calc_profile_close'),
		popupCalcEndClose =  document.querySelector('.popup_calc_end_close'),
	  calcObject = {
			width: 0,
			height: 0,
			viewType: 0,
			warmingType: 0,
			name: '',
			phone: ''
		},
		formControlWidth = document.getElementById('width'),
		formControlHeight = document.getElementById('height'),
		formControlViewType = document.getElementById('view_type'),
		nameRadio = document.getElementsByName('checkbox-test'),
		formCalc = document.getElementsByClassName('form_calc')[0],
		formCalcNameInput = document.querySelector('.name_input'),
		formCalcPhoneInput = document.querySelector('.phone_input'),
		calcBtn = document.querySelector('.calc_btn');
		
		console.log(formCalc);
				
// Клик по кнопке "Вызвать замерщика"

for (let i = 0; i < glazing_price_btn.length; i++) {
		glazing_price_btn[i].addEventListener('click', function() {
		popupCalc.style.display = 'block';
		// Сбрасываем объект
		for (var propertyName in calcObject) {
			calcObject[propertyName] = 0;
		}
		// Сбрасываем значения полей формы
		formControlWidth.value = '';
		formControlHeight.value = '';
		for (let i = 0; i < nameRadio.length; i++) {
			nameRadio[i].checked = false;
		}
		formControlViewType.value = '';
		formCalcNameInput.value = '';
		formCalcPhoneInput.value = '';
 
	});	
}	

// Переключаем картинки
balconBigImg[0].classList.add('active');

balconIcons.addEventListener('click', function(event) {
	let target = event.target;
	
	if (target.className == 'balcon_img') {
		for (let i = 0; i < balconImg.length; i++) {
			if (target == balconImg[i]) {
				changeActiveImg(i);
			}
		}
	}
});

function changeActiveImg(clickedIndex) {
	balconBigImg[activeBalconImgIndex].classList.remove('active');
	balconBigImg[clickedIndex].classList.add('active');

	balconImg[activeBalconImgIndex].classList.remove('active');
	balconImg[clickedIndex].classList.add('active');

	activeBalconImgIndex = clickedIndex;
}

// Запрет на ввод знаков,кроме цифр
for (let i = 0; i < formControl.length; i++) {
	formControl[i].onkeypress = function(e) {  
		if (e.key === '.' || e.key === '+' || e.key === ',' || e.key === '-') {
			return false;
		}
	}
}

// Закрываем окно с картинками, открываем с cold/warm
popupCalcButton.addEventListener('click', function() {
	popupCalcProfile.style.display = 'block';
	popupCalc.style.display = 'none';

	calcObject.width = formControlWidth.value;
	calcObject.height = formControlHeight.value;
	console.log('calcObject1:', calcObject);
});

// Close
popupCalcClose.addEventListener('click', function() {
	popupCalc.style.display = 'none';
});

// Закрываем окно с cold/warm, открываем с формой
popupCalcProfileButton.addEventListener('click', function() {
	popupCalcProfile.style.display = 'none';
	popupCalcEnd.style.display = 'block';

	calcObject.viewType = formControlViewType.value;
	for (let i = 0; i < nameRadio.length; i++) {
		if (nameRadio[i].checked) {
			calcObject.warmingType = nameRadio[i].value;
		}
	}
	console.log('calcObject2:', calcObject);
});

// Close
popupCalcProfileClose.addEventListener('click', function() {
	popupCalcProfile.style.display = 'none';
});

// Close
popupCalcEndClose.addEventListener('click', function() {
	popupCalcEnd.style.display = 'none';
});

//AJAX 

let statusMessage = document.createElement('div'),
 		mainForm = document.querySelectorAll('.main_form');
 		
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
	

	request.send(formData); // отправляем данные на сервер

	request.onreadystatechange = function() {          // отслеживаем статус готовности запроса
		if (request.readyState < 4) {
			statusMessage.innerHTML = message.loading;
		} else if (request.readyState === 4) {
			if (request.status == 200 && request.status < 300) {
				statusMessage.innerHTML = message.success;
				setTimeout(function() {
					statusMessage.innerHTML = '';
				}, 2000);
				// здесь можно добавить контент на страницу
			} else {
				statusMessage.innerHTML = message.error;
			}
		}
	} 

	for (let i = 0; i < input.length; i++) {
		input[i].value = ''; // очищаем поля ввода
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









	



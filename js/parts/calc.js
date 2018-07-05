function calc() {

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
		  	type: 0,
				width: 0,
				height: 0,
				viewType: 0,
				warmingType: 0,
				name: '',
				phone: ''
			},
			balconType = document.getElementsByName('balcon_type'),
			formControlWidth = document.getElementById('width'),
			formControlHeight = document.getElementById('height'),
			formControlViewType = document.getElementById('view_type'),
			nameRadio = document.getElementsByName('checkbox-test'),
			formCalc = document.getElementsByClassName('form_calc')[0],
			formCalcNameInput = document.querySelector('.name_input'),
			formCalcPhoneInput = document.querySelector('.phone_input'),
			calcBtn = document.querySelector('.calc_btn'),
			activeBalconImgIndex = 0;

			
					
	// Клик по кнопке "Расчитать стоимость"

	for (let i = 0; i < glazing_price_btn.length; i++) {
			glazing_price_btn[i].addEventListener('click', function() {
			popupCalc.style.display = 'block';

			// Сбрасываем объект
			for (let propertyName in calcObject) {
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
	 		for (let i = 0; i < balconImg.length; i++) {
	 			if (balconImg[i].classList.contains('active')) {
	 				balconImg[i].classList.remove('active');
	 				balconImg[0].classList.add('active');
	 			} 
	 		}
	 		for (let i = 0; i < balconBigImg.length; i++) {
	 			if (balconBigImg[i].classList.contains('active')) {
	 				balconBigImg[i].classList.remove('active');
	 				balconBigImg[0].classList.add('active');
	 			} 
	 		}
		});	
	}	

	// Переключаем картинки
	balconBigImg[0].classList.add('active');

	balconIcons.addEventListener('click', function(event) {
		let target = event.target;
		
		if (target.classList.contains('balcon_img')) {
			for (let i = 0; i < balconImg.length; i++) {
				if (target == balconImg[i] && balconImg[0].classList.contains('active') && balconImg[0].classList.contains('active')) {
					balconBigImg[0].classList.remove('active');
					balconImg[0].classList.remove('active')
				} 
				if (target == balconImg[i]) {
					changeActiveImg(i);
					calcObject.type = balconImg[i];
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
	function enterNumbersOnly(input) {
		for (let i = 0; i < input.length; i++) {
			input[i].onkeypress = function(e) {  
				if (e.key === '.' || e.key === '+' || e.key === ',' || e.key === '-') {
					return false;
				}
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

	enterNumbersOnly(formControl);

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

}

module.exports = calc;
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function() {

	
	let calc = require('../parts/calc.js');
	let ajax = require('../parts/ajax.js');
	let img = require('../parts/img.js');
	let popups = require('../parts/popups.js');
	let tabs = require('../parts/tabs.js');
	let timer = require('../parts/timer.js');

	
	calc();
	ajax();
	img();
	popups();
	tabs();
	timer();

});
},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/img.js":4,"../parts/popups.js":5,"../parts/tabs.js":6,"../parts/timer.js":7}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
function img() {

	// Картинки при клике

	let div = document.createElement('div'),
			body = document.getElementsByTagName('body')[0],
			imgBig = document.querySelectorAll('.our_works_big_img'),
			imgMinimized = document.querySelectorAll('.minimized');

	div.className = 'our_works_img';
	body.appendChild(div);

	function showBigImg(div, imgSmall, imgBig) { 
	  for (let i = 0; i < imgSmall.length; i++) {
	  	imgSmall[i].addEventListener('click', function() {
	  		div.style.display = 'block';
	  		div.appendChild(imgBig[i]);
	  		imgBig[i].style.display = 'block';
	  	});
		}
	}

	function closeBigImg(div, imgBig) {
		for (let i = 0; i < imgBig.length; i++) {
			div.addEventListener('click', function() {
				div.style.display = 'none';
				imgBig[i].style.display = 'none';
			});
		}
	}

	showBigImg(div, imgMinimized, imgBig);
	closeBigImg(div, imgBig);

}

module.exports = img;
},{}],5:[function(require,module,exports){
function popups() {
	// Popups

	let popupEngineerBtn = document.getElementsByClassName('popup_engineer_btn'),
			popupEngineer = document.querySelector('.popup_engineer'),
			popupClose = document.getElementsByClassName('popup_close'),
			phoneLink = document.getElementsByClassName('phone_link'),
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

	setTimeout(function() {
		popup.style.display = 'block';	
	}, 60000);

	openPopup(popupEngineerBtn, popupEngineer);
	openPopup(phoneLink, popup);
	closePopup(popupClose, popupEngineer);
	closePopup(popupClose, popup);
}

module.exports = popups;
},{}],6:[function(require,module,exports){
function tabs() {

	// Tabs

	let glazing_block = document.getElementsByClassName('glazing_block'),
			glazingContent = document.getElementsByClassName('glazing_content'),
			glazingSlider = document.getElementsByClassName('glazing_slider')[0],
			glazingLink = document.getElementsByClassName('glazing_link'),
			decorationContentItem = document.getElementsByClassName('decoration_content_item'),
			decorationSlider = document.getElementsByClassName('decoration_slider')[0],
			decorationLinkTitle = document.getElementsByClassName('decoration_link_title'),
			decorationLink = document.getElementsByClassName('decoration_link'),
			activeIndex = 0,
			activeBalconImgIndex = 0,
			activeDecorationIndex = 0;

	glazingContent[0].classList.add('active');

	glazingSlider.addEventListener('click', function(event) {
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

		glazingContent[activeIndex].classList.remove('active');
		glazingContent[clickedIndex].classList.add('active');

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
}

module.exports = tabs;
},{}],7:[function(require,module,exports){
function timer() {

	// Timer

	// Создаем заголовок для таймера
	createElements("timer1", "timer-header", false, true);

	// Внутри элемента с id "timer1" cоздаем блоки [дни, часы, минуты, секунды]

	["days", "hours", "minutes", "seconds"].forEach(function (id) {
	    createElements("timer1", id, false, true);

	    //Для каждого блока [дни, часы, минуты, секунды] создаем дочерние блоки с правой и левой цифрой
	    
	    ["left", "right"].forEach(function (child_id) {
	        createElements(id, child_id, true, true);
	    });

	    //Создаем подписи для значений
	    createElements(id, 'title-' + id, false, true);
	});

	// Задаем заголовок
	let header = document.getElementById('timer-header');
	header.innerHTML = "ДO ЗАВЕРШЕНИЯ АКЦИИ:";

	// Задаем подписи к значениям таймера
	let days = document.getElementById('title-days'),
		  hours = document.getElementById('title-hours'),
			minutes = document.getElementById('title-minutes'),
			seconds = document.getElementById('title-seconds');
	days.innerHTML = "дней";
	hours.innerHTML = "часов";
	minutes.innerHTML = "минут";
	seconds.innerHTML = "секунд";

	StartCountDown("timer1", "07/31/2018 00:00");

	function insertAfter(referenceNode, newNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	// ++ родительский элемент;
	// ++ идентификатор блока (берется из обрабатываемого массива);
	// ++ true - class="идентификатор блока"; false - id="идентификатор блока";
	// ++ true - СОЗДАТЬ ВНУТРИ родителя; false - ПРИКРЕПИТЬ ПОСЛЕ родителя
	function createElements(parent_id, id, create_class, create_child) {
	  create_class = typeof create_class !== 'undefined' ? !! create_class : false;
	  create_child = typeof create_child !== 'undefined' ? !! create_child : false;
	  let div = document.createElement('div'),
	  		parent = document.getElementById(parent_id);
	  if (create_class) {
	      div.className = id;
	  } else {
	      div.id = id;
	  }
	  if (create_child) {
	      parent.appendChild(div);
	  } else {
	      insertAfter(parent, div);
	  }
	}

	function StartCountDown(myDiv, myTargetDate) {
	  let dthen = new Date(myTargetDate),
	  		dnow = new Date();
	  ddiff = new Date(dthen - dnow);
	  gsecs = Math.floor(ddiff.valueOf() / 1000);
	  CountBack(myDiv, gsecs);
	}

	function Calcage(secs, num1, num2) {
	  s = ((Math.floor(secs / num1)) % num2).toString();
	  if (s.length < 2) {
	      s = "0" + s;
	  }
	  return (s);
	}

	function CountBack(myDiv, secs) {
	  let timeArr = [],
	      holder;
	  if (secs > 0) {
	    timeArr.days = Calcage(secs, 86400, 100000).split('');
	    timeArr.hours = Calcage(secs, 3600, 24).split('');
	    timeArr.minutes = Calcage(secs, 60, 60).split('');
	    timeArr.seconds = Calcage(secs, 1, 60).split('');

	    Object.keys(timeArr).map(function (key) {
	      holder = document.getElementById(key);
	      for (let i = 0; i < holder.childNodes.length; ++i) {
	        switch (holder.childNodes[i].className) {
	          case "left":
	            holder.childNodes[i].innerHTML = timeArr[key][0];
	            break;
	          case "right":
	            holder.childNodes[i].innerHTML = timeArr[key][1];
	            break;
	          default:
	            break;
	        }
	      }
	    });
	    setTimeout(function () {
	        CountBack(myDiv, secs - 1);
	    }, 990);
	  } else {
	      document.getElementById(myDiv).innerHTML = "АКЦИЯ ЗАВЕРШЕНА";
	  }
	}
}

module.exports = timer;
},{}]},{},[1]);

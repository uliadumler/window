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
		activeIndex = 0,
		activeBalconImgIndex = 0;

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

// Popup_calc

let glazing_price_btn = document.getElementsByClassName('glazing_price_btn'),
		popup_calc =  document.querySelector('.popup_calc'),
		balconIcons = document.getElementsByClassName('balcon_icons')[0],
		balconImg = document.getElementsByClassName('balcon_img'),
		balconBigImg = document.getElementsByClassName('balcon_big_img'),
		formControl = document.getElementsByClassName('form-control');

openPopup(glazing_price_btn, popup_calc);

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

for (let i = 0; i < formControl.length; i++) {
	formControl[i].onkeypress = function(e) {  
		if (e.key === '.' || e.key === '+' || e.key === ',' || e.key === '-') {
			return false;
		}
	}
}








	



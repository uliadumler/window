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
		glazing_slider = document.getElementsByClassName('glazing_slider')[0];

function hideTabContent(a) {
	
	for (let i = a; i < glazing_content.length; i++) {
		glazing_content[i].style.display = 'none';
	}

}

hideTabContent(1);

function showTabContent(b) {

	if (glazing_content[b].style.display = 'none') {
		hideTabContent(0);
		glazing_content[b].style.display = 'block'
	}

}

/*glazing_slider.addEventListener('click', function(event) {
	let target = event.target;
	if (target.className == 'glazing_block') {
		for (let i = 0; i < glazing_block.length; i++) {
			if (target == glazing_block[i]) {
				showTabContent(i);
				break;
			}
		}
	}
});*/

for (let i = 0; i < glazing_block.length; i++) {
	glazing_block[i].addEventListener('click', function() {
		showTabContent(i);
	});
}


// Popup_calc

let glazing_price_btn = document.getElementsByClassName('glazing_price_btn'),
		popup_calc =  document.querySelector('.popup_calc');

openPopup(glazing_price_btn, popup_calc);
	



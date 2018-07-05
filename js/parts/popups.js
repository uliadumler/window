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
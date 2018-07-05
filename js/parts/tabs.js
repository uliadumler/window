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
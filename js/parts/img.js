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
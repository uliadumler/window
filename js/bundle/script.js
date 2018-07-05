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
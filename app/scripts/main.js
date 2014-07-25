(function (window) {
	'use strict';
	var JAM = window.JAM || {};

	function addCarousel() {
		var carouselElement;

		carouselElement = window.document.getElementById('carousel');
		JAM.carousel.init(carouselElement);
	}

	addCarousel();

})(window);

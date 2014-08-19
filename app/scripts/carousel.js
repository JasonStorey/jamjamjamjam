(function (window, $) {
	'use strict';  
	function carousel(CAROUSEL) {
		var $container;

		function init(container) {
			var carouselSrc,
				categoryIndex = 0;

			$container = $(container);
			carouselSrc = $container.data().carouselSrc;

			load(carouselSrc, function configLoaded(carouselConfig) {
				CAROUSEL.display.init(carouselConfig);

				CAROUSEL.footer.init(carouselConfig);
				CAROUSEL.footer.onCategorySwitch(function(index) {
					categoryIndex = index;
					CAROUSEL.pagers.setItems(carouselConfig.categories[categoryIndex].images);
				});

				CAROUSEL.pagers.init(carouselConfig.categories[categoryIndex].images);
				CAROUSEL.pagers.onPage(function(index) {
					CAROUSEL.display.showImage(index, categoryIndex);
				});

				CAROUSEL.display.draw($container);
				CAROUSEL.pagers.draw($container);
				CAROUSEL.footer.draw($container);
			});
		}

		function load(url, cb) {
			$.getJSON(url).done(function(data) {
				cb(data);
			});
		}

		CAROUSEL.init = init;

		return CAROUSEL;
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = carousel(window.JAM.carousel || {});

})(window, window.jQuery);

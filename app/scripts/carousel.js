(function (window, $) {
	'use strict';  
	function carousel(CAROUSEL) {
		var $container,
			FOOTER = CAROUSEL.footer,
			PAGERS = CAROUSEL.pagers,
			DISPLAY = CAROUSEL.display;

		function init(container) {
			var carouselSrc,
				categoryIndex = 0,
				imageIndex = 0;

			$container = $(container);
			carouselSrc = $container.data().carouselSrc;

			load(carouselSrc, function configLoaded(carouselConfig) {
				DISPLAY.init(carouselConfig);
				FOOTER.init(carouselConfig);
				PAGERS.init(carouselConfig.categories[categoryIndex].images);
				
				FOOTER.onCategorySwitch(function(index) {
					categoryIndex = index;
					PAGERS.setItems(carouselConfig.categories[categoryIndex].images, imageIndex);
				});

				FOOTER.onClick(function(index) {
					imageIndex = 0;
					FOOTER.selectCategory(index);
				});
				
				PAGERS.onPage(function(index) {
					imageIndex = index;
					DISPLAY.showImage(imageIndex, categoryIndex);
					FOOTER.updateCounter(imageIndex);
				});

				PAGERS.onMax(function() {
					categoryIndex++;

					if(categoryIndex === carouselConfig.categories.length) {
						categoryIndex = 0;
					}

					imageIndex = 0;
					FOOTER.selectCategory(categoryIndex);
				});

				PAGERS.onMin(function() {
					categoryIndex--;

					if(categoryIndex === -1) {
						categoryIndex = carouselConfig.categories.length - 1;						
					}

					imageIndex = carouselConfig.categories[categoryIndex].images.length - 1;					
					FOOTER.selectCategory(categoryIndex);
				});

				DISPLAY.draw($container);
				PAGERS.draw($container, imageIndex);
				FOOTER.draw($container);
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

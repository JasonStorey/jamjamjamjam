(function (window, $) {
	'use strict';  
	function carousel() {
		var current = 0,
			$container;

		function init(container) {
			var carouselSrc;

			$container = $(container);
			carouselSrc = $container.data().carouselSrc;

			load(carouselSrc, function(carouselConfig) {
				var images = createImageElements(carouselConfig);
				buildDisplay(images)
				setupPagers();
			});
		}

		function rotate(n) {
			current = n;
			console.log('Rotate to : ' + current);
		}

		function load(url, cb) {
			$.getJSON(url).done(function(data) {
				cb(data);
			});
		}

		function createImageElements(carouselConfig) {
			var images = [];
			carouselConfig.images.forEach(function(imageConfig) {
				var $image = $('<img>').attr({
					'src': imageConfig.src,
					'alt': imageConfig.name,
					'title': imageConfig.name
				});

				images.push($image);
			});
			return images;
		}

		function buildDisplay(images) {
			var $display;

			$display = $('<div>').addClass('display');

			images.forEach(function($image, index) {
				console.log($image);
				if(index !== current) {
					$image.css('display', 'none');
				}
				$display.append($image);
			});

			$container.append($display);
		}

		function setupPagers() {
			var $leftPager,
				$rightPager;
			
			$leftPager = $('<a>').addClass('left-pager pager');
			$leftPager.click(function() {
				rotate(current - 1);
			});

			$rightPager = $('<a>').addClass('right-pager pager');
			$rightPager.click(function() {
				rotate(current + 1);
			});

			$container.append($leftPager)
					  .append($rightPager);
		}

		return {
			init: init,
			rotate: rotate
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = carousel();

})(window, window.jQuery);

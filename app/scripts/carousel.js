(function (window, $) {
	'use strict';  
	function carousel() {
		var startIndex = 0,
			current,
			prev,
			$container,
			$leftPager,
			$rightPager,
			images;

		function init(container) {
			var carouselSrc;

			$container = $(container);
			carouselSrc = $container.data().carouselSrc;

			load(carouselSrc, function(carouselConfig) {
				images = createImageElements(carouselConfig);
				buildDisplay(images, function() {
					setupPagers();
					rotate(startIndex);
				});				
			});
		}

		function rotate(n) {
			prev = current;
			if(n < 0) {
				current = 0;
			} else if (n > images.length -1) {
				current = images.length -1;
			} else {
				current = n;	
			}
			if(prev === current) {
				return;
			}
			console.log('Rotate to : ' + current);
			updateDisplay();
			updatePagers();
		}

		function load(url, cb) {
			$.getJSON(url).done(function(data) {
				cb(data);
			});
		}

		function centerImage(n) {
			var $image = images[n],
				width = $image.width();

			$image.css({
				'margin-left': '-' + (width / 2) + 'px'
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

		function updateDisplay() {
			if(prev !== undefined) {
				images[prev].removeClass('visible');
			}
			images[current].addClass('visible');
		}

		function buildDisplay(images, cb) {
			var $display;

			$display = $('<div>').addClass('display');

			images.forEach(function($image, index) {
				$image.on('load', function() {
					centerImage(index);
					if(index === startIndex) {
						cb();
					}
				});

				$display.append($image);
			});

			$container.append($display);
		}

		function updatePagers() {
			if(current === 0) {
				$leftPager.addClass('disabled');
			} else if (current === images.length - 1) {
				$rightPager.addClass('disabled');
			} else {
				$rightPager.removeClass('disabled');
				$leftPager.removeClass('disabled');
			}
		}

		function setupPagers() {			
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

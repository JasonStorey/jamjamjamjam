(function (window, $) {
	'use strict';  
	function carousel() {
		var images = [],
			startIndex = 0,
			current,
			prev,
			$container,
			$leftPager,
			$rightPager;

		function init(container) {
			var carouselSrc;

			$container = $(container);
			carouselSrc = $container.data().carouselSrc;

			load(carouselSrc, function configLoaded(carouselConfig) {				
				buildDisplay(carouselConfig);
				buildPagers();
				buildFooter(carouselConfig);
				rotate(startIndex);
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

		function centerImage($image) {
			var width = $image.width();

			$image.css({
				'margin-left': '-' + (width / 2) + 'px'
			});
		}

		function createImageElements(carouselConfig, cb) {
			carouselConfig.sections[0].images.forEach(function(imageConfig, index) {
				var $image = $('<img>').attr({
					'src': imageConfig.src,
					'alt': imageConfig.name,
					'title': imageConfig.name
				});

				$image.on('load', function() {
					cb($image);
				});

				images.push($image);
			});

			$(window).on('resize', function() {
				centerImage(images[current]);
			});
		}

		function updateDisplay() {
			if(prev !== undefined) {
				images[prev].removeClass('visible');
			}
			centerImage(images[current]);
			images[current].addClass('visible');
		}

		function buildDisplay(carouselConfig) {
			var $display;

			$display = $('<div>').addClass('display');

			createImageElements(carouselConfig, function onImageLoad($image) {
				$display.append($image);
				centerImage($image);
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

		function buildPagers() {			
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

		function buildFooter(carouselConfig) {
			var footswitchWidth = 80,
				$footer,
				$footswitchContainer,
				$footswitch;

			$footer = $('<div>').addClass('footer');
			$footswitchContainer = $('<div>').addClass('footswitch-container')
											.css('width', (footswitchWidth * carouselConfig.sections.length) + 'px');

			$footswitch = $('<a>').addClass('footswitch')
								.css('width', footswitchWidth + 'px');

			$footswitchContainer.append($footswitch);
			$footer.append($footswitchContainer);
			$container.append($footer);
		}

		return {
			init: init,
			rotate: rotate
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = carousel();

})(window, window.jQuery);

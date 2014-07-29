(function (window, $) {
	'use strict';  
	function carousel() {
		var imageElements = [],
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
			} else if (n > imageElements.length -1) {
				current = imageElements.length -1;
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

		function createImageElements(imagesArray, cb) {
			imagesArray.forEach(function(imageConfig, index) {
				var $image = $('<img>').attr({
					'src': imageConfig.src,
					'alt': imageConfig.name,
					'title': imageConfig.name
				});

				$image.on('load', function() {
					cb($image);
				});

				imageElements.push($image);
			});

			$(window).on('resize', function() {
				centerImage(imageElements[current]);
			});
		}

		function updateDisplay() {
			if(prev !== undefined) {
				imageElements[prev].removeClass('visible');
			}
			centerImage(imageElements[current]);
			imageElements[current].addClass('visible');
		}

		function buildDisplay(carouselConfig) {
			var $display;

			$display = $('<div>').addClass('display');

			createImageElements(carouselConfig.categories[0].images, function onImageLoad($image) {
				$display.append($image);
				centerImage($image);
			});

			$container.append($display);
		}

		function updatePagers() {
			if(current === 0) {
				$leftPager.addClass('disabled');
			} else if (current === imageElements.length - 1) {
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
			var $footer,
				$categoriesOuterWrapper,
				$categoriesInnerWrapper;

			$footer = $('<div>').addClass('footer');
			$categoriesOuterWrapper = $('<div>').addClass('categories-outer-wrapper');
			$categoriesInnerWrapper = $('<div>').addClass('categories-inner-wrapper');

			carouselConfig.categories.forEach(function(category) {				
				var $category = createCategory(category);
				$categoriesInnerWrapper.append($category);
			});

			$categoriesOuterWrapper.append($categoriesInnerWrapper);
			$footer.append($categoriesOuterWrapper);
			$container.append($footer);
		}

		function createCategory(categoryConfig) {
			var $categoryContainer,
				$category,
				$name,
				$counter;

			$categoryContainer = $('<div>').addClass('category-container');
			$category = $('<a>').addClass('category');
			$name = $('<span>').addClass('category-name')
							   .text(categoryConfig.name);

			$counter = $('<span>').addClass('category-counter')
							   	  .text(categoryConfig.images.length);

			$category.append($name);
			$category.append($counter);	
			$categoryContainer.append($category);		

			return $categoryContainer;
		}

		return {
			init: init,
			rotate: rotate
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = carousel();

})(window, window.jQuery);

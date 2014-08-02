(function (window, $) {
	'use strict';  
	function carousel() {
		var categories = [],
			startIndex = 0,
			currentCategoryIndex = 0,
			current,
			prev,
			$container,
			$display,
			$leftPager,
			$rightPager;

		function init(container) {
			var carouselSrc;

			$container = $(container);
			carouselSrc = $container.data().carouselSrc;

			load(carouselSrc, function configLoaded(carouselConfig) {				
				$display = buildDisplay(carouselConfig);

				loadCategory(carouselConfig, currentCategoryIndex);

				buildPagers();
				buildFooter(carouselConfig);
				rotate(startIndex);
			});
		}

		function loadCategory(carouselConfig, index) {
			if(categories[index]) {
				return;
			}
			categories[index] = createImageElements(carouselConfig.categories[index].images, function onImageLoad($image) {
				$display.append($image);
				centerImage($image);
			});
		}

		function rotate(n) {
			prev = current;
			if(n < 0) {
				current = 0;
			} else if (n > categories[currentCategoryIndex].length -1) {
				current = categories[currentCategoryIndex].length -1;
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
			var imageElements = [];
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

			return imageElements;
		}

		function updateDisplay() {
			if(prev !== undefined) {
				categories[currentCategoryIndex][prev].removeClass('visible');
			}
			centerImage(categories[currentCategoryIndex][current]);
			categories[currentCategoryIndex][current].addClass('visible');
		}

		function buildDisplay(carouselConfig) {
			var $display;

			$display = $('<div>').addClass('display');

			$container.append($display);

			return $display;
		}

		function updatePagers() {
			if(current === 0) {
				$leftPager.addClass('disabled');
			} else if (current === categories[currentCategoryIndex].length - 1) {
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

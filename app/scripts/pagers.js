(function (window, $) {
	'use strict';  
	function pagers() {
		var $leftPager,
			$rightPager,
			items = [],
			onPageCallback = function(){},
			onMinCallback = function(){},
			onMaxCallback = function(){},
			currentIndex,
			prevIndex;

		function init(itemsArray) {
			items = itemsArray;

			$leftPager = $('<a>').addClass('left-pager pager')
								 .click(rotateLeft);

			$rightPager = $('<a>').addClass('right-pager pager')
								  .click(rotateRight);

			setupKeyListeners();
		}

		function draw($container, imageIndex) {
			$container.append($leftPager)
					  .append($rightPager);
			rotate(imageIndex);
		}

		function setItems(itemsArray, imageIndex) {
			currentIndex = undefined;
			items = itemsArray;
			rotate(imageIndex);
		}

		function setupKeyListeners() {
			$('body').keydown(function(e) {
				if(e.which === 37) {
					rotateLeft();
				} else if(e.which === 39) {
					rotateRight();
				}
			});
		}

		function rotateLeft() {
			rotate(currentIndex - 1);
		}

		function rotateRight() {
			rotate(currentIndex + 1);
		}

		function rotate(n) {
			prevIndex = currentIndex;
			if(n < 0) {
				currentIndex = 0;
				onMinCallback();
			} else if (n > items.length - 1) {
				currentIndex = items.length -1;
				onMaxCallback();
			} else {
				currentIndex = n;
			}
			if(prevIndex === currentIndex) {
				return;
			}
			onPageCallback(currentIndex);
		}

		function onPage(cb) {
			onPageCallback = cb;
		}
		
		function onMin(cb) {
			onMinCallback = cb;
		}

		function onMax(cb) {
			onMaxCallback = cb;
		}

		return {
			init: init,
			draw: draw,
			setItems: setItems,
			onPage: onPage,
			onMin: onMin,
			onMax: onMax
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = window.JAM.carousel || {};
	window.JAM.carousel.pagers = pagers();

})(window, window.jQuery);

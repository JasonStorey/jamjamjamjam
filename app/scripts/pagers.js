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

			$leftPager = $('<a>').addClass('left-pager pager');
			$leftPager.click(function() {
				rotate(currentIndex - 1);
			});

			$rightPager = $('<a>').addClass('right-pager pager');
			$rightPager.click(function() {
				rotate(currentIndex + 1);
			});
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
			// REMOVED DISABLED STATE
			//updatePagers();
		}

		function updatePagers() {
			if(currentIndex === 0) {
				$leftPager.addClass('disabled');
			} else {
				$leftPager.removeClass('disabled');
			}

			if (currentIndex === items.length - 1) {
				$rightPager.addClass('disabled');
			} else {
				$rightPager.removeClass('disabled');
			}
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

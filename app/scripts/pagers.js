(function (window, $) {
	'use strict';  
	function pagers() {
		var $leftPager,
			$rightPager,
			items = [],
			onPageCallback = function(){},
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

		function draw($container) {
			$container.append($leftPager)
					  .append($rightPager);
			rotate(0);
		}

		function setItems(itemsArray) {
			currentIndex = undefined;
			items = itemsArray;
			rotate(0);
		}

		function rotate(n) {
			prevIndex = currentIndex;
			if(n < 0) {
				currentIndex = 0;
			} else if (n > items.length - 1) {
				currentIndex = items.length -1;
			} else {
				currentIndex = n;	
			}
			if(prevIndex === currentIndex) {
				return;
			}
			console.log('Rotate to : ' + currentIndex);
			onPageCallback(currentIndex);
			updatePagers();
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

		return {
			init: init,
			draw: draw,
			setItems: setItems,
			onPage: onPage
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = window.JAM.carousel || {};
	window.JAM.carousel.pagers = pagers();

})(window, window.jQuery);

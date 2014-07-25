(function (window, $) {
	'use strict';  
	function carousel() {
		var current = 0,
			container;

		function init(containerElem) {
			container = containerElem;
			setupPagers();
		}

		function rotate(n) {
			current = n;
			console.log('Rotate to : ' + current);
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

			$(container).append($leftPager)
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

(function (window, $) {
	'use strict';  
	function display() {
		var $displayElement,
			categories = [],
			$currentImage;

		function init(config) {
			$displayElement = $('<div>').addClass('display');

			config.categories.forEach(function(categoryConfig) {
				var category = {
					name: categoryConfig.name,
					images: categoryConfig.images.map(createImage)
				};
				categories.push(category);
			});
		}

		function draw($container) {
			$(window).on('resize', function() {
				centerImage($currentImage);
			});
			$container.append($displayElement);
			showImage(0, 0);
		}

		function showImage(index, category) {
			var $imageToShow = categories[category].images[index];
			
			if($imageToShow === $currentImage) {
				return;
			}
			
			hideCurrentImage();
			centerImage($imageToShow);
			$imageToShow.addClass('visible');
			$currentImage = $imageToShow;
		}

		function hideCurrentImage() {
			if(!$currentImage) {
				return;
			}
			$currentImage.removeClass('visible');
		}

		function createImage(imageConfig) {
			var $image = $('<img>').attr({
				'src': imageConfig.src,
				'alt': imageConfig.name,
				'title': imageConfig.name
			});

			$image.css('visibility', 'hidden');

			$image.on('load', function() {
				centerImage($image);
				$image.css('visibility', '');
			});

			$displayElement.append($image);

			return $image;
		}

		function centerImage($image) {
			var width = $image.width();

			$image.css({
				'margin-left': '-' + (width / 2) + 'px'
			});
		}

		return {
			init: init,
			draw: draw,
			showImage: showImage
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = window.JAM.carousel || {};
	window.JAM.carousel.display = display();

})(window, window.jQuery);

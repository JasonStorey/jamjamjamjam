(function (window, $) {
	'use strict';  
	function footer() {

		var $footer,
			$categories = [],
			$currentCategory,
			onSwitchCallback = function(){},
			currentCategoryIndex,
			categoriesConfig;

		function init(config) {
			var $categoriesOuterWrapper,
				$categoriesInnerWrapper;

			categoriesConfig = config;

			$footer = $('<div>').addClass('footer');
			$categoriesOuterWrapper = $('<div>').addClass('categories-outer-wrapper');
			$categoriesInnerWrapper = $('<div>').addClass('categories-inner-wrapper');

			config.categories.forEach(function(category, index) {				
				var $category;
				$category = createCategory(category, index);
				$categories.push($category);
				$categoriesInnerWrapper.append($category);
			});

			$categoriesOuterWrapper.append($categoriesInnerWrapper);
			$footer.append($categoriesOuterWrapper);
		}

		function draw($container) {
			$container.append($footer);
			selectCategory(0);
		}

		function createCategory(categoryConfig, index) {
			var $categoryContainer,
				$category,
				$counter,
				$name;

			$categoryContainer = $('<div>').addClass('category-container');
			$category = $('<a>').addClass('category');
			$name = $('<span>').addClass('category-name')
							   .text(categoryConfig.name);

			$counter = $('<span>').addClass('category-counter')
							   	  .text(categoryConfig.images.length);

			$category.append($name);
			$category.append($counter);	
			$categoryContainer.append($category);

			$category.click(function() {
				selectCategory(index);
			});

			return $categoryContainer;
		}

		function selectCategory(index) {
			var $categoryToSelect;

			$categoryToSelect = $categories[index];

			if($categoryToSelect === $currentCategory) {
				return;
			}

			if($currentCategory) {
				$currentCategory.find('.category-counter').text(categoriesConfig.categories[currentCategoryIndex].images.length);
				$currentCategory.removeClass('selected');	
			}
			currentCategoryIndex = index;
			$categoryToSelect.addClass('selected');
			$currentCategory = $categoryToSelect;
			onSwitchCallback(index);
		}

		function updateCounter(index) {
			if(!$currentCategory) {
				return;
			}
			$currentCategory.find('.category-counter').text((index + 1) + '/' + categoriesConfig.categories[currentCategoryIndex].images.length);
		}

		function onCategorySwitch(cb) {
			onSwitchCallback = cb;
		}

		return {
			init: init,
			draw: draw,
			onCategorySwitch: onCategorySwitch,
			updateCounter: updateCounter
		};
	}

	window.JAM = window.JAM || {};
	window.JAM.carousel = window.JAM.carousel || {};
	window.JAM.carousel.footer = footer();
})(window, window.jQuery);

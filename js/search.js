$(function () {
	var $searchBox = $('.search');
	$('.thumbs').append('<p class="user-not-found"></p>');
	$searchBox.focus();
	$searchBox.keyup(function () {
		var input = $searchBox.val().replace(/[^A-Za-z0-9._]/g, '');
		recentPosts.close();
		if (input) {
			$('.thumb').hide();
			window.scrollTo(0, 0);

			if (input === 'new') {
				$('.thumb.new').show();
			}
			else {
				var anythingFound = false;
				$('.thumb').filter(function () {
					var username = $(this).data('user');
					if (username.match(new RegExp('^' + input, 'i'))) {
						anythingFound = true;
						return true;
					}
					else {
						return false;
					}
				}).show();
				if (!anythingFound) {
					$('.user-not-found').show().html(
						'User <b>' + input + '</b> not found.<br> <a class="add-user" href="add.php?username=' + input + '">Add ' + input + '</a>'
					);
				}
				else {
					$('.user-not-found').hide();
				}
			}

		}
		else {
			$('.thumb').show();
		}
	});
});
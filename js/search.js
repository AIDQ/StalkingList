$(function () {
	$('.thumbs').append(
		'<p class="add-person" style="display: none;"></p>'
	);

	var $searchBox = $('.search');
	$searchBox.focus();
	$searchBox.keyup(function () {
		var input = $searchBox.val().replace(/[^A-Za-z0-9._]/g, '');
		recentPosts.close();
		if (input) {
			$('.thumb').hide();
			window.scrollTo(0, 0);

			var fullNameMatch = false;
			$('.thumb').filter(function () {
				var username = $(this).data('user');
				if (username.match(new RegExp('^' + input, 'i'))) {
					if (username === input) {
						fullNameMatch = true;
					}
					return true;
				}
				else {
					return false;
				}
			}).show();
			
			if (input === 'new') {
				$('.thumb.new').show();
				fullNameMatch = true;
			}
			
			if (!fullNameMatch) {
				$('.add-person').show().html(
					'User <b>' + input + '</b> not found.<br>' +
					'<a href="add.php?username=' + input + '">Add <b>' + input + '</b></a>'
				);
			}
			else {
				$('.add-person').hide();
			}
		}
		else {
			$('.thumb').show();
			$('.add-person').hide();
		}
	});
});
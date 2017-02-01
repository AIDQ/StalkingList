$(function() {
	var $searchBox = $('.search');

	$searchBox.focus();
	$searchBox.keyup(function() {
		var input = $searchBox.val().replace(/[^A-Za-z0-9._]/g,'');
		recentPosts.close();
		if (input) {
			$('.thumb').hide();
			window.scrollTo(0, 0);
			
			if (input === 'new') {
				$('.thumb.new').show();
			}
			else {
				$('.thumb').filter(function() {
					var username = $(this).data('user');
					if (username.match(new RegExp('^' + input, 'i')))
						return true;
					else
						return false;
				}).show();
			}
		}
		else {
			$('.thumb').show();
		}
	});
});
$(function() {
	if (typeof(Storage) !== 'undefined') {
		function highlight(thumb) {
			$(thumb).addClass('new');
		}
		function clear(thumb) {
			$(thumb).removeClass('new');
		}
		function updateStorage(i) {
			var saved_posts_count = JSON.parse(localStorage.posts_count);
			saved_posts_count[i] = current_posts_count[i];
			localStorage.posts_count = JSON.stringify(saved_posts_count);
		}

		if (localStorage.posts_count) {
			var saved_posts_count = JSON.parse(localStorage.posts_count);
			$('.thumb').each(function(i, thumb) {
				if (current_posts_count[i] > saved_posts_count[i]) {
					highlight(thumb);
				}
				else if (current_posts_count[i] < saved_posts_count[i]) {
					updateStorage(i);
				}
			});
		}
		else {
			localStorage.posts_count = JSON.stringify(current_posts_count);
		}

		$('.thumb').on('click', function() {
			var i = $(this).index();
			updateStorage(i);	
			clear(this);
		});	
	}
});
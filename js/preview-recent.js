var recentPosts = {
	openedIndex: undefined,
	open: function(thumb, thumbIndex) {
		var offsets = [];
		$('.thumb').each(function () {
			offsets.push($(this).offset().top);
		});
		var thumbOffsetTop = thumb.offset().top;
		for (var i = thumbIndex; i < offsets.length + 1; i += 1) {
			if (thumbOffsetTop !== offsets[i]) {
				var nodes = thumb.children('.media-json').data('media').nodes;
				var content = '';
				content += '<div class="recent-posts"><span class="arrow-up"></span>';
				for (var j = 0; j < nodes.length; j += 1) {
					var node = nodes[j];
					content += 
					'<div class="img-container">'+
						'<a href="https://www.instagram.com/p/'+node.code+'" target="_blank">'+
							'<img src="'+node.thumbnail_src+'">'+
							'<div class="img-overlay">'+
								'<span class="img-overlay-text">'+
									'<span class="overlay-icon likes">'+node.likes_count+'</span>'+
									'<span class="overlay-icon comments">'+node.comments_count+'</span>'+
								'</span>'+
							'</div>'+
						'</a>'+
					'</div>';
				}
				content += '</div>';
				$('.thumb').eq(i - 1).after(content);
				$('.recent-posts').delay(25).slideDown(100, function () {
					$('.arrow-up').css('left', thumb.offset().left - $(this).offset().left + thumb.outerWidth() / 2 - 10);
				});
				break;
			}
		}
	},
	close: function() {
		$('.recent-posts').slideUp(75, function () {
			$(this).remove();
		});
		recentPosts.openedIndex = undefined;
	}
};

$(function () {
	$(window).on('resize', function () {
		recentPosts.close();
	});
	$('.show-posts').on('click', function () {
		var thumb = $(this).parents('.thumb');
		var thumbIndex = thumb.index();
		if (thumbIndex === recentPosts.openedIndex) {
			recentPosts.close();
			return;
		}
		recentPosts.close();
		recentPosts.openedIndex = thumbIndex;
		recentPosts.open(thumb, thumbIndex);
	});
});
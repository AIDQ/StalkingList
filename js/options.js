// popUp object
var popUp = {
	opened: false,
	overlay: function() {
		this.opened = true;
		$('main').addClass('blur');
		$('main').after('<div class="overlay"><div>&times</div></div>');
		scrollPosition = $('body').scrollTop();
		$('.overlay').fadeIn(250, function() {
			$('body').addClass('no-scroll');
			$('body').css('top', -scrollPosition);
		});
	},
	openDialog: function(username, index) {
		this.overlay();
		$('.overlay').after(
			'<div class="pop-up dialog">'+
				'<p>Are you sure you want to remove<br><b>'+username+'?</b></p>'+
				'<a class="yes" href="edit.php?index='+index+'">Yes</a>'+
				'<a class="no" href="#">No</a>'+
			'</div>'
		);
		$('.pop-up').fadeIn(250);
		$('.pop-up a.no').on('click', function(e) {
			popUp.close();
			e.preventDefault();
		});
	},
	openImage: function(imgurl) {
		this.overlay();
		$('.overlay').after('<img class="pop-up image" src="'+imgurl+'">');
		$('.pop-up').fadeIn(250);
	},
	close: function() {
		$('body').removeClass('no-scroll');
		$('body').removeAttr('style');
		$('body').scrollTop(scrollPosition);
		$('main').removeClass('blur');
		$('.overlay').fadeOut(250, function() {
			$('.overlay').remove();
		});
		$('.pop-up').fadeOut(250, function() {
			$(this).remove();
		});
		this.opened = false;
	}
};
// editForm object
var editForm = {
	opened: null, // .thumb
	open: function(username, index, $this) {
		this.opened = $this.parents('.thumb');
		this.opened.addClass('edit');
		this.opened.children('.username').after(
			'<form action="edit.php" method="GET">'+
				'<input type="hidden" name="index" value="'+index+'">'+
				'<input type="text" name="new" autocomplete="off">'+
				'<input type="submit" value="&#10003;">'+
			'</form>'
		);
		var nameInput = this.opened.find('input[name=new]');
		nameInput.focus();
		nameInput.val(username);
		this.opened.children('form').on('submit', function(e) {
			if (!nameInput.val()) {
				e.preventDefault();
			}
		});
	},
	close: function() {
		this.opened.removeClass('edit');
		this.opened.children('form').remove();
	}
};
// Thumb options object
var options = {
	opened: null, // .thumb .opt
	toggleOpen: function() {
		this.opened.children().toggle();
		this.opened.toggleClass('opened');
	},
	close: function() {
		this.opened.children().hide();
		this.opened.removeClass('opened');
	}
};

$(function() {
	// Thumb options action
	$('.opt').on('click', function() {
		options.opened = $(this);
		options.toggleOpen();
	});
	$('.thumb .opt a').on('click', function(e) {
		var $this = $(this);
		var username = $this.parents('.thumb').data('user');
		var index = $this.parents('.thumb').index();
		options.toggleOpen();
		if ($this.attr('href') === '#edit') {
			editForm.open(username, index, $this);
			e.preventDefault();
		}
		if ($this.attr('href') === '#remove') {
			popUp.openDialog(username, index);
			e.preventDefault();
		}
	});

	// Zoom profile-pic action
	$('.thumb .zoom-in-img').parent().on('click', function(e) {
		var imgurl = $(this).attr('href');
		popUp.openImage(imgurl);
		e.preventDefault();
	});

	// recent posts
	$('.thumb .username a, .thumb .posts').on({
		mouseenter: function() {
			$(this).parents('.thumb').children('.posts').show();
		},
		mouseleave: function() {
			$(this).parents('.thumb').children('.posts').hide(0);
		}
	});

	// Outside click listener
	$(document).mouseup(function(e) {
		if (options.opened !== null) {
			if (!options.opened.is(e.target)) {
				options.close();
			}
		}
		if (popUp.opened) {
			if (!($('.pop-up').find('*').addBack().is(e.target))) {
				popUp.close();
			}
		}
	});
	$(document).mousedown(function(e) {
		if (editForm.opened != null) {
			if (!editForm.opened.find('input').is(e.target)) {
				editForm.close();
			}
		}
	});

	// Esc key listener
	$(document).keyup(function(e) {
		if (e.keyCode === 27) {
			if (popUp.opened) {
				popUp.close();
			}
			if (options.opened !== null) {
				options.close();
			}
			if (editForm.opened !== null) {
				editForm.close();
			}
		}
	});
});
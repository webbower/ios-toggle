; (function($){
	var
		touch = 'touchend' in document,
		clickEvent = touch ? 'touchend' : 'click'
	;

	jQuery.fn.extend({
		iPhoneCheckbox: function() {
			return this.each(function() {
				var
					t = this, // DOM Object
					$this = $(t), // jQ Object
					obj = {
						onText: 'On',
						offText: 'Off'
					},
					switchOff = function(el) { el.classList.remove('on'); el.classList.add('off'); },
					switchOn = function(el) { el.classList.remove('off'); el.classList.add('on'); },
					html = '<div class="checkbox' + (t.checked ? ' on' : ' off' ) + '"><div class="inner"><div class="on">' + obj.onText + '</div><div class="handle"></div><div class="off">' + obj.offText + '</div></div></div>',
					checkbox = $(html).insertAfter(t)
				;
				
				console.log(checkbox);  // TODO: Remove for Production

				$this.hide();

				if(touch) {
					checkbox.bind('tap', function(ev) {
						if(checkbox.hasClass('off')) switchOn(checkbox);
						else switchOff(checkbox);
						t.click();
					}).bind('swipeleft', function(ev) {
						switchOff(checkbox);
						this.checked = false;
					}).bind('swiperight', function(ev) {
						switchOn(checkbox);
						this.checked = true;
					});
				} else {
					checkbox.bind(clickEvent, function() {
						if(checkbox.hasClass('off')) switchOn(checkbox[0]);
						else switchOff(checkbox[0]);
						t.click();
						console.log(t.checked);  // TODO: Remove for Production
					});
				}
			});

		}
	});
	$(function() {
		$("input[type='checkbox']").iPhoneCheckbox();
	});
})(jQuery);

/*
// 2.0
; (function($){
	$.fn.iPhoneCheckbox = function() {
		return this.each(function() {
			var
				cb = this,
				$cb = $(cb),

				// Utility functions
				switchOff = function($el) { $el.removeClass('on').addClass('off'); },
				switchOn = function($el) { $el.removeClass('off').addClass('on'); },

				// Reference to the root element of the Toggle UI
				$root
			;
			// Inject the additional HTML and store the $root reference
			$cb.wrap('<div class="ios-toggle' + (!cb.checked ? ' off' : ' on' ) + '"/>').after('<div class="handle"><b></b></div>');
			$root = $cb.parent();

			// Pass up any classes (for positioning and such) from the checkbox element to the root element
			$root.addClass(cb.className);


			if($.support && $.support.touch) {
				$root
					.on('tap', function() {
						if(cb.checked)
							switchOff($root);
						else
							switchOn($root);

						$cb.click();
					})
					.on('swipeleft', function() {
						switchOff($root);
						if(this.checked) {
							$cb.click();
						}
					})
					.on('swiperight', function() {
						switchOn($root);
						if(!this.checked) {
							$cb.click();
						}
					})
				;
			} else {
				$root
					.on('click', function(ev) {
						// Prevent the event from infinitely looping
						if(ev.target !== cb) {
							if(cb.checked)
								switchOff($root);
							else
								switchOn($root);

							$cb.click();
						}
					})
				;
			}
		});
	};
})(window.jQuery);
*/

/*
;
(function($, window, undefined) {
    $(document).ready(function() {
        $('.toggle-switch label').bind('click', function(e) {
            var $checkbox = $(this).siblings('input');
            e.preventDefault();
            $checkbox.attr('checked', !$checkbox.attr('checked'));
        });
    });
})(jQuery, this);
*/
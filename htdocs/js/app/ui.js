define(["jquery"], function($) {

	return {
		menu: {
			toggle: function() {
				$('body').toggleClass('ui-showmenu');
			},
			show: function() {
				$('body').addClass('ui-showmenu');
			},
			hide: function() {
				$('body').removeClass('ui-showmenu');
			}
		},
		back: {
			show: function() {
				$('#btn-back').show();
			},
			hide: function() {
				$('#btn-back').hide();
			},
			toggle: function(state) {
				$('#btn-back').toggle(state);
			}
		}
	};

});
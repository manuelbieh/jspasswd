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
		}
	};

});
define(["jquery"], function($) {

	return {

		togglePasswordVisibility: function(item, show) {

			var nodeName = $(item).get(0).nodeName;

			if(nodeName !== 'BUTTON') {
				item = $(item).find('button');
			}

			if(show === true || (typeof show == 'undefined' && item.attr('data-visible') == "false")) {
				//item.html(item.attr('data-resolved')).attr('data-visible', "true");
				item.html('hide').addClass('pw-visible').attr('data-visible', "true");
				item.parent().find('.item-password-value').html(item.attr('data-resolved'));
			} else if(show === false || (typeof show == 'undefined' && item.attr('data-visible') == "true")) {
				//item.html(item.attr('data-hidden')).attr('data-visible', "false");
				item.html('show').removeClass('pw-visible').attr('data-visible', "false");
				item.parent().find('.item-password-value').html(item.attr('data-hidden'));
			}

		},

		isInternalURL: function(url) {

			if(url.match(/^[a-zA-Z]*:\/\//i)) {
				// external link
				return false;
			} else if(url.match(/^[\w|-]*:(.*)/i)) {
				// protocol handler
				return false;
			} else {
				// seems to be internal link
				return true;
			}


		}

	};

});
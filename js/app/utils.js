define(["jquery"], function($) {

	return {

		togglePasswordVisibility: function(item, show) {

			var nodeName = $(item).get(0).nodeName;

			if(nodeName !== 'BUTTON') {
				item = $(item).find('button');
			}

			if(show === true || (typeof show == 'undefined' && item.attr('data-visible') == "false")) {
				item.html(item.attr('data-resolved')).attr('data-visible', "true");
			} else if(show === false || (typeof show == 'undefined' && item.attr('data-visible') == "true")) {
				item.html('••••••••').attr('data-visible', "false");
			}

			if($('*[data-visible="false"]').length === 0) {
				// alle aufgedeckt
				$('.visibility-switch').find('.show-all').addClass('hidden');
				$('.visibility-switch').find('.hide-all').removeClass('hidden');
			} else if($('*[data-visible="true"]').length === 0) {
				// alle zugedeckt
				$('.visibility-switch').find('.hide-all').addClass('hidden');				
				$('.visibility-switch').find('.show-all').removeClass('hidden');
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
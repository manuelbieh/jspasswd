define(['jquery', 'handlebars'], function($, hbs) {

	hbs.registerHelper('breaklines', function(text) {
		text = hbs.Utils.escapeExpression(text);
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return new hbs.SafeString(text);
	});

	hbs.registerHelper('toupper', function(text) {
		text = hbs.Utils.escapeExpression(text);
		text = text.toUpperCase();
		return new hbs.SafeString(text);
	});

	hbs.registerHelper('chain', function () {
		var helpers = [], value;
		$.each(arguments, function (i, arg) {
			if (hbs.helpers[arg]) {
				helpers.push(hbs.helpers[arg]);
			} else {
				value = arg;
				$.each(helpers, function (j, helper) {
					value = helper(value, arguments[i + 1]);
				});
				return false;
			}
		});
		return value;
	});

	return {

		get: function(tplName) {
			return $('[data-tpl="'+tplName+'"]').html();
		},

		compile: function(tplName, tplData) {
			var tpl = hbs.compile(this.get(tplName));
			return tpl(tplData);
		},

		render: function(tplName, tplData) {
			$('#canvas').find('.inner').html(this.compile(tplName, tplData));
		}

	};

});
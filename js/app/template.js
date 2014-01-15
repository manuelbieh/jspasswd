define(['jquery', 'handlebars'], function($, hbs) {

	return {

		get: function(tplName) {
			return $('[data-tpl="'+tplName+'"]').html();
		},

		compile: function(tplName, tplData) {
			var tpl = hbs.compile(this.get(tplName));
			return tpl(tplData);
		},

		render: function(tplName, tplData) {
			$('#canvas').html(this.compile(tplName, tplData));
		}

	};

});
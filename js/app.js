requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        handlebars: 'handlebars-1.3.0'
    },
    shim: {
		'handlebars': {
			'exports': 'Handlebars'
		}
    }
});

require( ["jquery", "handlebars"], function($, hbs) {

	var tpl = hbs.compile($('[data-tpl="password-list"]').html());
	console.log(tpl({
		items: [{
			url: 'foo',
			notes: 'ntoes',
			encrypted: 'enc',
			resolved: 'res',
			title: 'TITLE'
		}]
	}));

});
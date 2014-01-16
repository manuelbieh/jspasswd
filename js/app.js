requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        handlebars: 'handlebars-1.3.0',
        GibberishAES: 'gibberish-aes-1.0.0.min',
        FastClick: 'fastclick'
    },
    shim: {
		'handlebars': {
			'exports': 'Handlebars'
		},
		'GibberishAES': {
			'exports': 'GibberishAES'
		}
    }
});

require(["jquery", "handlebars", "GibberishAES", "FastClick", "app/callback", "app/template", "app/database", "app/events", "app/router"], 
	function($, hbs, GibberishAES, FastClick) {

	var Callback = require('app/callback');
	var Template = require('app/template');
	var Database = require('app/database');
	var Events = require('app/events');
	var Router = require('app/router');

	Router.set({
		baseUrl: '/_git/pword'
	});

	FastClick.attach(document.body);

	//console.log(Database.encryptEntry('foo', 'test'));
	Callback.on('database.open', function() {

	});

	//Template.render('open-url');

	Router.add('/(index.html)?', function() {

		Template.render('open-url');

	});

	Router.add('/open', function() {

		if(Database.isLocked()) {

			Router.go('/lock');
			return;

		}

		Template.render('password-list', Database.get());

	});

	Router.add('/lock', function() {

		if(Database.get()) {

			Database.lock();
			Template.render('lockscreen');

		} else {

			Router.go('/');

		}

	});

	Router.add('/error', function() {

		var Template = require('app/template');
		var Error = '';

		if(!!history.state != false) {
			Error = history.state.error || '';
		}

		Template.render('error', {
			error: Error
		});

	});

	Router.run();

	return;

});
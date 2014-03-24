requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        app: '../app',
        handlebars: 'handlebars-1.3.0',
        GibberishAES: 'gibberish-aes-1.0.0.min',
        FastClick: 'fastclick'
    },
    urlArgs: "nocache=" + (+new Date()),
    shim: {
		'handlebars': {
			'exports': 'Handlebars'
		},
		'GibberishAES': {
			'exports': 'GibberishAES'
		}
    }
});

require(["jquery", "handlebars", "GibberishAES", "FastClick", "jquery.locationObserver", "app/callback", "app/template", "app/database", "app/events", "app/router"], 
	function($, hbs, GibberishAES, FastClick) {

	var $locationObserver = require('jquery.locationObserver');
	var Callback = require('app/callback');
	var Template = require('app/template');
	var Database = require('app/database');
	var Events = require('app/events');
	var Router = require('app/router');

	if(location.host == 'dev.wiremore.de') {

		Router.set({
			baseUrl: '/pword'
		});

	}

	$.locationObserver.start();

	$(location).on('change', function() {
		Router.run();
	});

	FastClick.attach(document.body);


	Router.add('/(index.html)?', function() {
		Template.render('home');
	});


	Router.add('/database/open', function() {
		Template.render('open-url');
	});


	Router.add('/database/create', function() {
		
	});


	Router.add('/settings', function() {

		Template.render('settings');
		return Router.END;

	});


	Router.add('/database/view', function() {

		if (!Database.get()) {

			Router.go('/');
			return;

		} else if(Database.isLocked()) {

			Router.go('/database/lock');
			return;

		}

		Template.render('password-list', Database.get());

	});

	Router.add('/database/lock', function() {

		if(Database.get()) {

			Database.lock();
			Template.render('lockscreen');
			return;

		}

		Router.go('/');

	});

	Router.add('/error', function() {

		var Template = require('app/template');
		var Error = '';

		if(!!history.state != false) {
			Error = history.state.error || '';
		}

		Template.render('error', {
			error: Error || 'Unknown error.'
		});

	});

	Router.add('/database/entry/edit/(.*)', function(key) {
		console.log(key);
	});

	Router.add('/help', function() {
		Template.render('help');
	});

	Router.run();

	return;

});
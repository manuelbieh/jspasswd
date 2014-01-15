requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        handlebars: 'handlebars-1.3.0',
        GibberishAES: 'gibberish-aes-1.0.0.min'
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

require( ["jquery", "handlebars", "GibberishAES", "app/callback", "app/template", "app/database", "app/events"], function($, hbs, GibberishAES) {

	var Callback = require('app/callback');
	var Template = require('app/template');
	var Database = require('app/database');
	var Events = require('app/events');

	//console.log(Database.encryptEntry('foo', 'test'));
	Callback.on('databaseopen', function() {
		alert('db is open!');
	});

	Template.render('open-url');

	return;


});
define(["jquery", "GibberishAES", "app/database", "app/callback", "app/template"], function($, GibberishAES, Database, Callback, Template) {

	$(document).on('click', '#open', function() {

		Database.load(
			$('#db-url').val(), 
			$('#db-pw').val(), 
			$('#db-save').is(':checked')
		);

	});

	Callback.on('databaseopen.done', function() {
		Template.render('password-list', Database.get());
	});

});
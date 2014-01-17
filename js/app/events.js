define(["jquery", "GibberishAES", "app/database", "app/callback", "app/template", "app/utils", "app/router"], function($, GibberishAES, Database, Callback, Template, Utils, Router) {

	$(document).on('click', '#open', function() {

		var dbLoad = Database.load(
			$('#db-url').val(), 
			$('#db-pw').val(), 
			$('#db-save').is(':checked')
		);

	});


	$(document).on('click', '#unlock', function() {

		try {

			var pw = GibberishAES.dec(Database.getPassword(), $('#db-pw').val());
			Database.open(pw);

		} catch(e) {

			Router.go('/error', {
				error: 'Failed to unlock database. Wrong password?'
			});
			//alert('Wrong password.');

		}

	});

	$(document).on('click', '.btn-pwd-switch', function(e) {

		Utils.togglePasswordVisibility($(this));

	});

	$(document).on('click', '.visibility-switch button', function(e) {

		var $$ = $(this);
		$$.parent().find('button').removeClass('hidden');
		$$.addClass('hidden');

		var show = !!$$.hasClass('show-all');
		$('.pw-item').each(function(i, item) {
			Utils.togglePasswordVisibility(item, show);
		});

	});

/*
	Callback.on('database.open', function() {
		//Template.render('password-list', Database.get());
	});

	Callback.on('database.locked', function() {
		Template.render('lockscreen');
	});
*/

});
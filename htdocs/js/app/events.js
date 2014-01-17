define(["jquery", "GibberishAES", "app/database", "app/callback", "app/template", "app/utils", "app/router", "app/ui"], function($, GibberishAES, Database, Callback, Template, Utils, Router, UI) {

	$(function() {
		$('body').fadeIn(function() {
			$('body').removeClass('loading');
		});
	});

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

	$(document).on('click', '.show-all, .hide-all', function(e) {

		var $$ = $(this);

		var show = !!$$.hasClass('show-all');
		$('.pw-item').each(function(i, item) {
			Utils.togglePasswordVisibility(item, show);
		});

	});

	$(document).on('click', '#btn-menu', function(e) {
		e.preventDefault();
		UI.menu.toggle();
	});

	$(document).on('click', '#btn-back', function(e) {
		e.preventDefault();
		history.back();
	});

	$(document).on('click', '.fn-menu-close', function(e) {
		UI.menu.hide();
	});


});
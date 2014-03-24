define(["jquery", "GibberishAES", "app/database", "app/callback", "app/template", "app/utils", "app/router", "app/ui"], function() {

	var $ = require('jquery'),
		GibberishAES = require('GibberishAES'),
		Database = require('app/database'),
		Callback = require('app/callback'),
		Template = require('app/template'),
		Utils = require('app/utils'),
		Router = require('app/router'),
		UI = require('app/ui');

	window.history.replaceState(
		{entry: true}, null, location.href
	);


	$(function() {

		$('body').fadeIn(function() {
			$('body').removeClass('loading');
		});

		UI.back.hide();

	});


	$(window).on('popstate', function(e) {

		//Router.run(e);

		if(e && e.originalEvent && e.originalEvent.state && e.originalEvent.state.entry === true) {
			console.info('true!!!');
			UI.back.hide();
		} else {
			console.info('false!!!');
			UI.back.show();
		}

		UI.menu.hide();

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

			var entered = $('#db-pw').val();
			var pw = GibberishAES.dec(Database.getPassword().passwordEncrypted, entered);

			Database.open(pw);
			Database.setPassword(entered);

		} catch(e) {

			Router.go('/error', {
				error: 'Failed to unlock database. Wrong password?'
			});

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

	$(document).on('click', '.save', function(e) {
		console.log(Database.encryptAll());
	});

	$(document).on('click', '#btn-menu', function(e) {
		e.preventDefault();
		UI.menu.toggle();
	});

	$(document).on('click', '#btn-back', function(e) {
		e.preventDefault();
		history.back();
	});

	$(document).on('click', 'menu a', function(e) {
		UI.menu.hide();
	});

	Callback.on('pageload', function() {

		if(!!window.history.state == false) {
			UI.back.show();
		}

	});

	Callback.on('database.open', function() {
		$('body').addClass('db-open').removeClass('db-locked');
	});

	Callback.on('database.close', function() {
		$('body').removeClass('db-open db-locked');
	});

	Callback.on('database.lock', function() {
		$('body').addClass('db-locked').removeClass('db-open');
	});

});
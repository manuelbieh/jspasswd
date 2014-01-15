(function(window, undefined) {

	var _database = null;
	var _password = '';

	var App = {

		init: function() {

			App.event.on('databaseopen', function() {

				App.loadTemplate('password-list');
				var pwList = $('#password-list').find('ul');
				var itemTpl = pwList.find('li');
				var listContent = '';

				$.each(_database.data, function(i, item) {

					var row = itemTpl.find('h1').html(item.title).end();
					
					if(item.url != null) {
						row.find('.item-url').show().next().show().find('a').html(item.url).end();
					} else {
						row.find('.item-url').hide().next().hide().end();
					}

					if(item.notes != null) {
						row.find('.item-notes').show().next().show().html(item.notes);
					} else {
						row.find('.item-notes').hide().next().hide().end();
					}

					row.find('.item-password').next().find('button').attr('data-visible', false).attr('data-resolved', item.resolved).html('••••••••');

					listContent += row.parent().html();

				});

				pwList.html(listContent);

			});

			// bind events
			$(document).on('click', '#open', function() {

				var pwDb = $.ajax({
					url: $('#db-url').val()
				});

				pwDb.done(function(res) {

					try {

						var pw = $('#db-pw').val();
						App.setPassword(pw);
						App.openDatabase(GibberishAES.dec(res, pw));

					} catch(e) {

						alert('Could not open DB.');
						console.log(e);

					}

				});

				pwDb.fail(function(err) {
					alert('Could not load DB.');
				});

			});

			$(document).on('click', '.btn-pwd-switch', function(e) {
				App.togglePasswordVisibility($(this));
			});

			$(document).on('click', '.visibility-switch button', function(e) {
				var $$ = $(this);
				$$.parent().find('button').removeClass('hidden');
				$$.addClass('hidden');
				var show = !!$$.hasClass('show-all');
				$('.pw-item').each(function(i, item) {
					App.togglePasswordVisibility(item, show);
				});
			});

			App.loadTemplate('open-url');

		},

		loadTemplate: function(tplName) {

			$('#canvas').html(App.getTemplate(tplName).html());

		},

		getTemplate: function(tplName) {

			var tpl = $('*[data-tpl="' + tplName + '"]');

			if(tpl.length == 1) {

				return tpl;

			} else {

				alert('Template "' + tplName + '" not found.');

			}


		},

		decrypt: function(encrypted, password) {

			try {
				return GibberishAES.dec(encrypted, password);
			} catch(e) {
				// ERROR!
				console.log(e);
				return null;
			}

		},

		decryptAll: function(database, password) {

			if(typeof database == 'object') {
				for(var item in database.data) {
					database.data[item].resolved = App.decrypt(database.data[item].encrypted, password);
				}
			}
			return database;

		},

		togglePasswordVisibility: function(item, show) {

			var nodeName = $(item).get(0).nodeName;
			if(nodeName !== 'BUTTON') {
				item = $(item).find('button');
			}

			if(show === true || (typeof show == 'undefined' && item.attr('data-visible') == "false")) {
				item.html(item.attr('data-resolved')).attr('data-visible', "true");
			} else if(show === false || (typeof show == 'undefined' && item.attr('data-visible') == "true")) {
				item.html('••••••••').attr('data-visible', "false");
			}

			if($('*[data-visible="false"]').length === 0) {
				// alle aufgedeckt
				$('.visibility-switch').find('.show-all').addClass('hidden');
				$('.visibility-switch').find('.hide-all').removeClass('hidden');
			} else if($('*[data-visible="true"]').length === 0) {
				// alle zugedeckt
				$('.visibility-switch').find('.hide-all').addClass('hidden');				
				$('.visibility-switch').find('.show-all').removeClass('hidden');
			}

		},

		setPassword: function(pw) {
			_password = pw;
		},

		getPassword: function() {
			return _password;
		},

		openDatabase: function(data) {

			_database = App.decryptAll(JSON.parse(data), App.getPassword());

			if(typeof _database != 'undefined') {
				App.event.trigger('databaseopen');
			}

		},

		lockDatabase: function() {
		
		},

		event: {

			handlers: {},

			// function to register callbacks for certain events
			on: function(event, callback) {

				if(typeof callback == 'function') {

					if(typeof(App.event.handlers[event]) == 'undefined') {
						App.event.handlers[event] = [];
					}

					App.event.handlers[event].push(callback);

				}

			},

			/*
			 * If second parameter is specified, only the specified callback will be deleted.
			 * Otherwise the complete event will be deleted.
			 */
			off: function(event, callback) {

				if(typeof(App.event.handlers[event]) != 'undefined') {

					if(typeof(callback) != 'undefined') {

						var cbCount = App.event.handlers[event].length;

						for(var i = 0; i < cbCount; i++) {
							if(App.event.handlers[event][i] == callback) {
								App.event.handlers[event].splice(i, 1);
							}
						}

					} else {

						delete App.event.handlers[event];

					}

				}

			},

			// fires event handlers for a certain event
			trigger: function(event, params) {

				if(App.event.handlers[event] instanceof Array) {

					var cbCount = parseInt(App.event.handlers[event].length, 10);
					for(var callback = 0; callback < parseInt(App.event.handlers[event].length, 10); callback++) {
						App.event.handlers[event][callback](params);
					}

				}

			}

		},

		debug: function() {
			console.log(_database, _password);
			return _database;
		}

	};

	window.App = App;

})(this);

$(function() {
	App.init();
});
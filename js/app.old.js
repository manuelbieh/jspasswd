
	var App = {

		init: function() {

			App.Template.render('open-url');

			// bind events
			$(document).on('click', '#open', function() {

				var pwDb = $.ajax({
					url: $('#db-url').val()
				});

				pwDb.done(function(res) {

					try {

						_password = $('#db-pw').val();
						_database = JSON.parse(GibberishAES.dec(res.replace(/\s/g,''), _password));

						if($('#db-save').is(':checked')) {
							localStorage.setItem('pwdb', JSON.stringify(_database));
						}

					} catch(e) {

						alert('Could not open DB.');
						console.log(e);

					}

				});

			});

		},

		Template: {

			get: function(tplName) {
				return $('[data-tpl="'+tplName+'"]').html();
			},

			compile: function(tplName, tplData) {
				var tpl = hbs.compile(App.Template.get(tplName));
				return tpl(tplData);
			},

			render: function(tplName, tplData) {
				$('#canvas').html(App.Template.compile(tplName, tplData));
			}

		},

		Database: {

			decryptEntry: function(encrypted, password) {

				try {
					return GibberishAES.dec(encrypted, password);
				} catch(e) {
					// ERROR!
					return null;
				}

			},

			decryptAll: function() {

				if(typeof _database == 'object') {

					for(var item in _database.data) {
						_database.data[item].resolved = App.Database.decryptEntry(_database.data[item].encrypted, password);
					}

				} else {

					App.Error.show('No database was loaded');
					return;

				}

			}

		},

		UI: {

			Error: {

				show: function(content) {
					alert(content);
				},

				hide: function() {
				
				}

			}

		}

	};

	App.init();
define(["jquery", "GibberishAES", "app/callback", "app/router"], function($, GibberishAES, Callback, Router) {

	var _database;
	var _password;
	var _passwordEncrypted;
	var _locked = true;

	var Database = {

		set: function(database) {
			_database = database;
			return this;
		},

		get: function() {
			return _database;
		},

		setPassword: function(password) {
			//_password = GibberishAES.enc(password, password);
			_passwordEncrypted = GibberishAES.enc(password, password);
			_password = password;
			return this;
		},

		getPassword: function() {

			return {
				password: _password, 
				passwordEncrypted: _passwordEncrypted
			};

		},

		encryptEntry: function(clear, password) {
			return GibberishAES.enc(clear, password);
		},

		encryptAll: function(password) {
			password = password || this.getPassword();
			return GibberishAES.enc(JSON.stringify(this.get()), password);
		},

		decryptEntry: function(encrypted, password) {

			try {
				return GibberishAES.dec(encrypted, password);
			} catch(e) {
				// ERROR!
				return null;
			}

		},

		decryptAll: function(_database, password) {

			_database = _database || this.get();

			if(typeof _database == 'object') {

				for(var item in _database.data) {
					_database.data[item].resolved = this.decryptEntry(_database.data[item].encrypted, password);
				}

			} else {

				Router.go('/error', {
					error: 'No database was loaded.'
				});

				return;

			}

		},

		load: function(url, password, save) {

			var loadDatabase = $.ajax({
				url: url
			});

			loadDatabase.done(function(res) {

				res = res.replace(/\s/g,'');

				try {

					Database.set(JSON.parse(GibberishAES.dec(res, password)));
					Database.setPassword(password);

					if(save === true) {
						localStorage.setItem('_database', JSON.stringify(Database.get()));
					}

					Database.open(password);

				} catch(e) {

					//alert('Could not load database');
					Router.go('/error', {
						error: 'Failed to open database. Wrong password?'
					});
					console.log(e);

				}

			});

		},

		open: function(password) {

			try {

				this.decryptAll(this.get(), password);
				_locked = false;
				Callback.trigger('database.open');
				Router.go('/database/view');
				return true;
				
			} catch(e) {

				Router.go('/error', {
					error: 'Failed to open database. Wrong password?'
				});
				return false;

			}

		},

		close: function() {
			Callback.trigger('database.close');
		},

		isLocked: function() {
			return _locked;
		},

		hasLock: function() {
			return this.isLocked();
		},

		lock: function() {

			var _database = this.get();

			if(typeof _database == 'object') {

				for(var item in _database.data) {
					delete _database.data[item].resolved;
				}

				_locked = true;
				_password = null;
				Callback.trigger('database.lock');

			} else {

				//alert('No database was loaded');
				Router.go('/');
				return;

			}

		}

	};

	return Database;

});
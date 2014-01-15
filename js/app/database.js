define(["jquery", "GibberishAES", "app/callback"], function($, GibberishAES, Callback) {

	var _database;
	var _password;

	var Database = {

		set: function(database) {
			_database = database;
			return this;
		},

		get: function() {
			return _database;
		},

		setPassword: function(password) {
			_password = password;
			return this;
		},

		getPassword: function() {
			return _password;
		},

		encryptEntry: function(clear, password) {
			return GibberishAES.enc(clear, password);
		},

		encryptAll: function() {
		
		},

		decryptEntry: function(encrypted, password) {

			try {
				return GibberishAES.dec(encrypted, password);
			} catch(e) {
				// ERROR!
				return null;
			}

		},

		decryptAll: function(_database) {

			if(typeof _database == 'object') {

				for(var item in _database.data) {
					_database.data[item].resolved = this.decryptEntry(_database.data[item].encrypted, this.getPassword());
				}

			} else {

				alert('No database was loaded');
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

					Database.open();

				} catch(e) {

					alert('Could not load database');
					console.log(e);

				}

			});

		},

		open: function() {
			try {
				this.decryptAll(this.get());
				Callback.trigger('databaseopen.done');
			} catch(e) {
				Callback.trigger('databaseopen.fail', e);
				alert('Failed to open database. Wrong password?');
			}
		},

		close: function() {
		
		},

		lock: function() {

			var _database = this.get();

			if(typeof _database == 'object') {

				for(var item in _database.data) {
					delete _database.data[item].resolved;
				}

			} else {

				alert('No database was loaded');
				return;

			}

		}

	};

	return Database;

});
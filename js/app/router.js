define(['jquery', 'app/callback', 'app/utils'], function($, Callback, Utils) {

	var _routes = {};

	var _config = {
		baseUrl: ''
	};

	$(window).on('popstate', function(e) {
		Router.run(e);
	});

	$(document).on('click', 'a', function(e) {

		var $$ = $(this);
		var href = $$.attr('href');

		if(Utils.isInternalURL(href)) {
			e.preventDefault();
			history.pushState(null, null, href);
			Router.run();
			return false;
		}

	});

	var Router = {

		set: function(prop, value) {

			if(typeof prop == 'object') {
				for(var property in prop) {
					_config[property] = prop[property];
				}
			} else {
				_config[prop] = value;
			}

		},

		get: function(prop) {
			return _config[prop] || null;
		},

		go: function(url, state) {

			if(url.indexOf('/') === 0) {
				var baseUrl = this.get('baseUrl') || '';
				url = baseUrl + url;
			}

			history.pushState(state, null, url);
			//this.run();
		},

		add: function(route, handler) {

			if(typeof _routes[route] == 'undefined') {

				_routes[route] = [];
				_routes[route].push(handler);

			} else {

				_routes[route].push(handler);

			}

		},

		match: function(url, search) {

			if(!(search instanceof RegExp)) {
				search = '^' + search + '$';
			}

			search = new RegExp(search);

			return url.match(search);

		},

		run: function() {

			var url = location.pathname;
			var baseUrl = this.get('baseUrl') || '';

			if(url.indexOf(baseUrl) === 0) {
				url = url.substr(baseUrl.length);
			}

			if(typeof _routes != 'undefined') {

				for(var route in _routes) {

					var match = this.match(url, route);

					if(match != null) {

						var matching = match.splice(0,1);

						if(_routes[route] instanceof Array) {

							_routes[route].forEach(function(handler) {

								handler.apply(handler.prototype, match);

							});

						}

					}

				}

			}

		}

	};

	return Router;

});
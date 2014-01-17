define([], function() {

	return {

		handlers: {
		},

		// function to register callbacks for certain events
		on: function(event, callback) {

			if(typeof callback == 'function') {

				if(typeof(this.handlers[event]) == 'undefined') {
					this.handlers[event] = [];
				}

				this.handlers[event].push(callback);

			}

		},

		/*
		 * If second parameter is specified, only the specified callback will be deleted.
		 * Otherwise the complete event will be deleted.
		 */
		off: function(event, callback) {

			if(typeof(this.handlers[event]) != 'undefined') {

				if(typeof(callback) != 'undefined') {

					var cbCount = this.handlers[event].length;

					for(var i = 0; i < cbCount; i++) {
						if(this.handlers[event][i] == callback) {
							this.handlers[event].splice(i, 1);
						}
					}

				} else {

					delete this.handlers[event];

				}

			}

		},

		// fires event handlers for a certain event
		trigger: function(event, params) {

			if(this.handlers[event] instanceof Array) {

				var cbCount = parseInt(this.handlers[event].length, 10);
				for(var callback = 0; callback < parseInt(this.handlers[event].length, 10); callback++) {
					this.handlers[event][callback](params);
				}

			}

		}

	}

});
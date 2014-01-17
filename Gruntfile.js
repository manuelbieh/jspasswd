/*global module:false*/
module.exports = function(grunt) {

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
	// Metadata.
		"pkg": grunt.file.readJSON('package.json'),
		"meta": {
			"banner": "/*! Manuel Bieh - <%= pkg.name %> - v<%= pkg.version %> - " +
			"<%= grunt.template.today('yyyy-mm-dd HH:MM') %>\n" +
			"* <%= pkg.homepage %>\n" +
			"* Copyright (c) <%= grunt.template.today('yyyy') %> " +
			"Manuel Bieh */"
		},
		// Task configuration.
		"sass": {
			"dist": {
				"files": {
					"htdocs/css/layout.css" : "src/scss/master.scss"
				},
				"options": {
					"lineNumbers": true
				}
			},
			"distmin": {
				"files": {
					"htdocs/css/layout.min.css" : "src/scss/master.scss"
				},
				"options": {
					"style": "compressed"
				}
			}
		},
		"watch": {
			"sass": {
				files: ['src/scss/**/*', 'src/scss/*'],
				tasks: ['sass']
			}
		}
	});

	grunt.registerTask('build', [/*'clean:precopy', 'copy', 'clean:postcopy', */'sass', /*'concat', 'replace', 'increment-build', 'showtime'*/]);

	// Default task.
	grunt.registerTask('default', ['build', 'watch']);

};

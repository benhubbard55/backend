module.exports = function(grunt) {

	grunt.config.set('sass', {
		dev: {
			files: [{
				expand: true,
				cwd: 'assets/front/scss/',
				src: ['importer.scss'],
				dest: '.tmp/public/front/css',
				ext: '.css'
			}, {
				expand: true,
				cwd: 'assets/admin/scss/',
				src: ['importer.scss'],
				dest: '.tmp/public/admin/css',
				ext: '.css'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
};
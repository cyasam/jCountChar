module.exports = function(grunt){

	grunt.initConfig({
		sass: {                       
		    dist: {
				options: {
					style: 'expanded',
					noCache: true,
					lineNumbers: true,
					sourcemap: 'none'
				},
				files: [{
			        expand: true,
			        cwd: 'css/sass',
			        src: ['*.scss'],
			        dest: 'css',
			        ext: '.css'
			    }]
		    }
		},
		cssmin: {
		  target: {
		    files: [{
		    	expand: true,
				cwd: 'css',
				src: ['*.css', '!*.min.css'],
				dest: 'css',
				ext: '.min.css'
		    }]
		  }
		},
		jshint: {
		    all: ['Gruntfile.js', 'js/*.js', '!js/*.min.js']
		},
		uglify: {
		    my_target: {
				files: [{
          			expand: true,
			        cwd: 'js',
			        src: ['*.js','!*.min.js'],
			        dest: 'js',
					ext: '.min.js'
			    }]
		    }
		},
		watch: {
		  	styles: {
		    	files: ['css/sass/*.scss'],
		    	tasks: ['sass','cssmin'],
		    	options: {
		      		spawn: false
		    	},
		  	},
		  	scripts: {
		    	files: ['js/*.js','!js/*.min.js'],
		    	tasks: ['jshint','uglify'],
		    	options: {
		      		spawn: false
		    	},
		  	},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['sass','cssmin','jshint', 'uglify','watch']);

};
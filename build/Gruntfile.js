/*global module:false */

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),
		
		/*----------------------------------( WATCH )----------------------------------*/
		
		/**
		 * Run predefined tasks whenever watched file patterns are added, changed
		 * or deleted.
		 *
		 * $ grunt watch
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-watch
		 */
		
		watch : {
			
			tmpl : {
				
				files : [
					
					'./files/**/*'
					
				],
				
				tasks : ['dev']
				
			}
			
		},
		
		/*----------------------------------( JSHINT )----------------------------------*/
		
		/**
		 * Validate files with JSHint.
		 *
		 * @see http://www.jshint.com/
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 * @see https://github.com/jshint/jshint/blob/master/src/stable/jshint.js
		 * @see http://www.jshint.com/docs/
		 */
		
		jshint : {
			
			options : {
				
				jshintrc : '.jshintrc'
				
			},
			
			init : [
				
				'./Gruntfile.js',
				'./files/js/<%= pkg.name %>.js'
				
			]
			
		},
		
		/*----------------------------------( ENVIRONMENT )----------------------------------*/
		
		/**
		 * Grunt task to automate environment configuration for future tasks.
		 *
		 * @see https://github.com/onehealth/grunt-env
		 */
		
		env : {
			
			dev : {
				
				NODE_ENV : 'DEVELOPMENT'
				
			},
			
			pro : {
				
				NODE_ENV : 'PRODUCTION'
				
			}
			
		},
		
		/*----------------------------------( CLEAN )----------------------------------*/
		
		/**
		 * Clean files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true // Sketchy!
				
			},
			
			main : [
				
				'../<%= pkg.name %>/**/*',
				'../demo/**/*'
				
			]
			
		},
		
		/*----------------------------------( UGLIFY )----------------------------------*/
		
		/**
		 * Minify files with UglifyJS.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 * @see http://lisperator.net/uglifyjs/
		 */
		
		uglify : {
			
			pro : {
				
				files : {
					
					'../<%= pkg.name %>/<%= pkg.name %>.min.js': './files/js/<%= pkg.name %>.js'
					
				}
				
			}
			
		},
		
		/*----------------------------------( COPY )----------------------------------*/
		
		/**
		 * Copy files and folders.
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-copy
		 * @see http://gruntjs.com/configuring-tasks#globbing-patterns
		 */
		
		copy : {
			
			dev : {
				
				files : [
					
					{
						
						expand : true,
						cwd : './files/',
						src : ['css/**', 'js/**', 'index.html'],
						dest : '../demo/'
						
					}
					
				]
				
			},
			
			pro : {
				
				files : [
					
					{
						
						expand : true,
						cwd : './files/',
						src : ['css/**', 'index.html'],
						dest : '../demo/'
						
					},
					
					{
						
						expand : true,
						cwd : '../<%= pkg.name %>/',
						src : ['<%= pkg.name %>.min.js'],
						dest : '../demo/js/'
						
					}
					
				]
				
			}
			
		},
		
		/*----------------------------------( PREPROCESS )----------------------------------*/
		
		/**
		 * Grunt task around preprocess npm module.
		 *
		 * @see https://github.com/onehealth/grunt-preprocess
		 * @see https://github.com/onehealth/preprocess
		 */
		
		preprocess : {
			
			files : {
				
				src : '../demo/index.html',
				dest : '../demo/index.html'
				
			}
			
		}
		
	});
	
	//--------------------------------------------------------------------
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	
	grunt.loadNpmTasks('grunt-preprocess');
	
	grunt.loadNpmTasks('grunt-env');
	
	//----------------------------------
	
	grunt.registerTask('dev', ['jshint', 'env:dev', 'clean', 'copy:dev', 'preprocess']);
	
	grunt.registerTask('pro', ['jshint', 'env:pro', 'clean', 'uglify:pro', 'copy:pro', 'preprocess']);
	
};

var bourbonPaths = require('node-bourbon').includePaths;
var neatPaths = require('node-neat').includePaths;
var sassPaths = bourbonPaths.concat(neatPaths);

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  grunt.initConfig({
    jshint:{
      options:{
        jshintrc:true
      },
      files:['*.js', 'lib/**/*.js', 'models/**/*.js',
        'test/**/*-test.js', 'routes/**/*.js', 'app/**/*.js']
    },

    jscs: {
      all: {
        options: {
          config:'.jscsrc'
        },
        files: {
          src: ['*.js', 'lib/**/*.js', 'test/**/*-test.js',
            'models/**/*.js', 'routes/**/*.js', 'app/**/*.js']
        }
      }
    },

    clean:{
      build:{
        src:['build/']
      }
    },

    copy:{
      build:{
        expand: true,
        cwd: 'app/',
        src: ['**/*.html', '**/*.css'],
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify:{
      dev:{
        src: ['app/js/**/*.js', 'app/js/**/*.jsx'],
        dest: 'build/bundle.js'
      },
      options:{
        transform:['reactify']
      }
    },

    watch:{
      files:['app/js/**/*.js', 'app/js/**/*.jsx', 'app/**/*.html',
        'app/sass/*.scss'],
      tasks:['clean', 'browserify', 'sass', 'copy']
    },
    sass:{
      dist:{
        options:{
          includePaths: sassPaths
        },
        files:{
          './build/css/main.css': './app/sass/main.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs']);
  grunt.registerTask('build', ['clean', 'browserify:dev', 'sass', 'copy']);
  grunt.registerTask('build:test', ['build:test']);

};

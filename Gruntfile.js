module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

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
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      options:{
        transform:['reactify', 'debowerify']
      }
    },

    watch:{
      files:['app/js/**/*.js', 'app/**/*.html', 'app/**/*.css'],
      tasks:['clean', 'browserify', 'copy']
    },
    sass:{
      dist:{
        files:{
          './app/css/main.css': './app/css/main.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'jscs']);
  grunt.registerTask('build', ['clean', 'browserify:dev', 'sass', 'copy']);
  grunt.registerTask('build:test', ['build:test']);

};

var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('jscs', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jscs());
});

gulp.task('jshint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function() {

})

gulp.task('default', ['jscs', 'jshint']);
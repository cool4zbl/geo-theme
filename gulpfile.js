var gulp   = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefix = require('gulp-autoprefixer');

gulp.task('scss', function () {
  return gulp.src('src/_scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefix('last 2 version', 'ie 8', 'ie 9'))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function () {
  return gulp.src(['src/js/**/*.js', '!src/js/**/*.min.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(gulp.dest('assets/js'));
});

gulp.task('build', ['scss', 'js']);
gulp.task('watch', function () {
  gulp.watch('src/', ['build']);
});


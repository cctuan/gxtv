var fs = require('fs');
var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var compass = require('gulp-compass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var sequence = require('gulp-sequence');
var changed = require('gulp-changed');
var jscs = require('gulp-jscs');

var CURRENT_ENVIRONMENT = 'development';

// TODO
// we have to double check **/*.js is a right expression or not
const SCSS_FILES = './client/styles/scss/**/*.scss';
const JS_FILES = './client/js/**/*.js';
const VENDOR_FILES = './client/vendor/**/*';
const DIST_FILES = './client/dist';
const INDEX_TEMPLATE_FILE = './client/index.html';
const INDEX_FILE = './client/index.html';
const RESOURCE_FILE = './client/resource/**/*';
const CONFIG_FILE = './client/config/rjs_config.json';

function isProduction() {
  return CURRENT_ENVIRONMENT === 'production';
}

gulp.task('jscs', function() {
  var dest = './client/dist/js/';
  return gulp.src(JS_FILES)
    .pipe(changed(dest))
    .pipe(jscs());
});

gulp.task('cleanup', function() {
  return gulp
    .src([DIST_FILES], {
      read: false
    })
    .pipe(clean());
});

gulp.task('6to5', function() {
  var dist = './client/dist/js/';
  return gulp
    .src(JS_FILES)
    .pipe(changed(dist))
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(dist));
});

gulp.task('linter', function() {
  var dist = './client/dist/js/';
  return gulp
    .src([
      './client/js/**/*.js'
    ])
    .pipe(changed(dist))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copy:vendor', function() {
  var dist = './client/dist/vendor';
  return gulp
    .src(VENDOR_FILES)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist));
});

gulp.task('copy:resource', function() {
  var dist = './client/dist/resource';
  return gulp
    .src(RESOURCE_FILE)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist));
});

gulp.task('copy:config', function() {
  var dist = './client/dist/config';
  return gulp
    .src(CONFIG_FILE)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist));
});

gulp.task('rjs', function(done) {
  // all frontend + backend js -> main.js
  fs.readFile('./client/config/rjs_config.json', 'utf-8', function(error, rawData) {
    if (error) {
      console.log(error);
      return;
    }
    else {
      var rjsConfig = JSON.parse(rawData);
      rjs(rjsConfig)
        .pipe(gulp.dest('./dist/js/'))
        .on('end', done);
    }
  });
});

gulp.task('compass', function() {
  var dest = './client/dist/css/';
  return gulp
    .src(SCSS_FILES)
    .pipe(changed(dest))
    .pipe(plumber())
    .pipe(compass({
      config_file: './client/config/compass_config.rb',
      css: './client/dist/css/',
      sass: './client/styles/scss/'
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('html', function() {
  var dest = './client/dist';
  return gulp.src(INDEX_TEMPLATE_FILE)
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
  gulp.watch(SCSS_FILES, ['compass']);
  gulp.watch([
    JS_FILES,
    INDEX_TEMPLATE_FILE
  ], ['default']);
});

gulp.task('build', function(callback) {
  CURRENT_ENVIRONMENT = 'production';
  sequence(
    'cleanup',
    '6to5',
    'linter',
    'copy:vendor',
    'copy:resource',
    'copy:config',
    'html'
  )(callback);
});

gulp.task('default', function(callback) {
  CURRENT_ENVIRONMENT = 'development';
  sequence(
    'cleanup',
    '6to5',
    'compass',
    'linter',
    'jscs',
    'copy:vendor',
    'copy:resource',
    'copy:config',
    'html'
  )(callback);
});
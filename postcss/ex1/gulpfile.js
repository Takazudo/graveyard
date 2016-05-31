'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require("gulp-postcss");
var postcssImport = require("postcss-import");
var autoprefixer = require("autoprefixer");
//var simpleVars = require("postcss-simple-vars");
//var mixins = require("postcss-mixins");
var cssnano = require("cssnano");
var reporter = require("postcss-reporter");
//var stylelint = require("stylelint");
//var stylelinterConfig = require("./stylelintConfig.js");
//var colorFunction = require("postcss-color-function");
//var nested = require("postcss-nested");
var sourcemaps = require("gulp-sourcemaps");
 
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

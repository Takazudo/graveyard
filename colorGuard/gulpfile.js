var gulp = require("gulp");
var concat = require("gulp-concat");
var postcss = require("gulp-postcss");
var reporter = require("postcss-reporter");
var colorguard = require("colorguard");
var colorguardFormatter = require("postcss-colorguard-formatter");

gulp.task("checkColorCollision", function() {

  // PostCSSのプラグインらを指定
  var processors = [
    colorguard(),
    reporter({ formatter: colorguardFormatter.default })
  ];

  return gulp.src("src/**/*.css") // CSSファイル全てが対象
    .pipe(concat('temp.css'))
    .pipe(postcss(processors));
});

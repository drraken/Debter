const gulp = require('gulp'),
      pug = require('gulp-pug'),
      pump = require('pump'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      watch = require('gulp-watch');

gulp.task('watch', function () {
    gulp.watch(`./src/pug/**/*.pug`, ['compile-pug']);
    gulp.watch(`./src/js/*.js`, ['compile-js']);
    gulp.watch(`./src/sass/*.scss`, ['compile-sass']);
});

gulp.task('compile-sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('compile-js', function (cb) {
    pump([
        gulp.src('./src/js/*.js'),
        uglify(),
        gulp.dest('./dist/js/')
    ],cb);
});

gulp.task('compile-pug', function () {
  return gulp.src('./src/pug/pages/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: false
     }))
    .pipe(gulp.dest('./dist/html/'));
});

//--- default task---//
gulp.task('default', ['compile-sass','compile-js','compile-pug','watch']);
      
      
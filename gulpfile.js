const gulp    = require('gulp'),     
      pump    = require('pump'),
      sass    = require('gulp-sass'),     
      watch   = require('gulp-watch'),
      plumber = require('gulp-plumber');

gulp.task('watch', function () {       
    gulp.watch(`./src/sass/*.scss`, ['compile-sass']);
});

gulp.task('compile-sass', function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});


//--- default task---//
gulp.task('default', ['compile-sass','watch']);
      
      
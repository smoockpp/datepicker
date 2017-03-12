'use strict';

var    gulp = require('gulp'),
      babel = require("gulp-babel"),
     concat = require('gulp-concat'),
     uglify = require('gulp-uglify'),
     rename = require('gulp-rename'),
       sass = require('gulp-sass'),
       maps = require('gulp-sourcemaps'),
   cleanCSS = require('gulp-clean-css'),
        del = require('del'),
browserSync = require('browser-sync').create(),
     reload = browserSync.reload;

function swallowError (error) {

 // If you want details of the error in the console
 console.log(error.toString())
 this.emit('end')
}

gulp.task('concatScripts', function() {
  return gulp.src([
      'scripts/main.js'])
  .pipe(concat('app.js'))
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/js'));
});


gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('dist/js/app.js')
      .pipe(maps.init())
      .pipe(uglify())
      .on('error', swallowError)
      .pipe(rename('app.min.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/js'));
});



gulp.task('compileSass', function() {
  return gulp.src('scss/app.scss')
      .pipe(maps.init())
      .pipe(sass())
      .on('error', swallowError)
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('minifyCSS', ['compileSass'], function() {
    return gulp.src([
            'dist/css/app.css'
            ])
        .pipe(cleanCSS())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watchFiles', function() {
  browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
  gulp.watch('scss/**/*.scss', ['compileSass', 'minifyCSS']).on('change', reload);
  gulp.watch('*.html', ['html']).on('change', reload);
  gulp.watch('scripts/main.js', ['concatScripts', 'minifyScripts']).on('change', reload);
});



gulp.task('html', function() {
  return gulp.src(['index.html', 'img/**'], { base: './' })
             .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['html', 'watchFiles']);

gulp.task('default', function() {
  gulp.start('build');
});

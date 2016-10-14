var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');



// move all to src to deploy
gulp.task('moveSrcToDeploy', function() {
  return gulp.src('src/**/*.*', { base: './src'})
    .pipe(gulp.dest('deploy/'));
});


// min libs js
gulp.task('concatLibsJS', ['moveSrcToDeploy'], function() {
  return gulp.src('src/scripts/libs/*.js')
    .pipe(uglify())
    .pipe(concat('libs-bundle-min.js'))
    .pipe(gulp.dest('deploy/scripts/libs/'));
});


// min classes js
gulp.task('concatJS', ['moveSrcToDeploy'], function() {
  return gulp.src('src/scripts/classes/**/*.js')
    .pipe(uglify())
    .pipe(concat('all-bundle-min.js'))
    .pipe(gulp.dest('deploy/scripts/classes/'));
});

 // min css
gulp.task('uglifyCSS', ['moveSrcToDeploy'], function () {
  return gulp.src('src/scss/app.scss')
    .pipe(sass().on('error', sass.logError))
    //.pipe(concatCss("bundle.css"))
    //.pipe(minifyCss())
    .pipe(gulp.dest('deploy/styles/'));
});

 
 
// Rerun the task when a file changes 
gulp.task('watch', function() {
	gulp.watch('src/**/*.*', ['moveSrcToDeploy', 'concatLibsJS', 'concatJS', 'uglifyCSS']);
});
 
// The default task (called when you run `gulp` from cli)
gulp.task('clean', ['moveSrcToDeploy'])
gulp.task('default', ['moveSrcToDeploy', 'concatLibsJS', 'concatJS', 'uglifyCSS']);
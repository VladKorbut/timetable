var gulp = require('gulp');
var webserver = require('gulp-webserver');
var browserSync = require('browser-sync').create();
 
gulp.task('default', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port:80,
      directoryListing: false,
      open: true,
      fallback: './index.html'
    }));
});
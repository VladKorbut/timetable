var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
 
gulp.task('minify-html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('.'));
});
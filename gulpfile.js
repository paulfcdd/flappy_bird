var gulp = require('gulp');
var webserver = require('gulp-webserver');
 
gulp.task('server', function() {
  gulp.src('app/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
	  path: '/',
	  fallback: 'app/index.html'
    }));
});
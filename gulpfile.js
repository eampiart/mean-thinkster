var gulp = require('gulp');

gulp.task('default', function() {
    console.log("Gulp is working!");
});

var watcher = gulp.watch('*.*');
watcher.on('change', function(event){
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
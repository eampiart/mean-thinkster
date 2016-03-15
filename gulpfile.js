var gulp = require('gulp');
var uglifyjs = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('minifyJS', function(){
    return gulp.src('lib/js/app.js')
    .pipe(maps.init())
        .pipe(uglifyjs())
        .pipe(rename('app.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('minifySass', function(){
    return gulp.src('lib/scss/main.scss')
    .pipe(maps.init())
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(rename('app.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
    console.log("Watching files for change...");
    gulp.watch('lib/js/app.js', ['minifyJS']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch('lib/scss/*.scss', ['minifySass']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('build', ['minifyJS', 'minifySass', 'watch']);

gulp.task('default', ['build'], function() {
    console.log("Gulp is now your servant!");
});
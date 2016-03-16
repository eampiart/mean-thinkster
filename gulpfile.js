var gulp = require('gulp');
var uglifyjs = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var maps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

gulp.task('minifyJS', function(){
    return gulp.src('lib/js/angularApp.js')
    .pipe(maps.init())
        .pipe(uglifyjs())
        .pipe(rename('main.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('public'));
});

gulp.task('minifySass', function(){
    return gulp.src('lib/scss/main.scss')
    .pipe(maps.init())
        .pipe(sass())
        .pipe(uglifycss())
        .pipe(rename('style.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function(){
    console.log("Watching files for change...");
    gulp.watch('lib/js/*.js', ['minifyJS']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    gulp.watch('lib/scss/*.scss', ['minifySass']).on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('start', function() {
    nodemon();
});

gulp.task('build', ['minifyJS', 'minifySass']);

gulp.task('default', ['build', 'watch', 'start'], function() {
    console.log("Gulp is now your servant!");
});
var gulp        = require('gulp');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var livereload  = require('gulp-livereload');
var prefix      = require('gulp-autoprefixer');
var express     = require('express');
var app         = express();
var gutil       = require('gulp-util');
var path        = require('path');
// var data        = require('gulp-data');


app.use(express.static(path.resolve('./build')))

app.listen('8080', function() {
    gutil.log('Listening on', '8080');
});


gulp.task('html', function() {
    gulp.src('jade/index.jade')
    // take this out later it is the menu
        // .pipe(data(function(file) {
        //     return require('./data.json');
        // }))
    //to here
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .pipe(livereload())
});

gulp.task('css', function() {
    gulp.src(['css/*.css', 'sass/*.sass'])
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(livereload())
});

gulp.task('images', function() {
    gulp.src('images/*')
        .pipe(gulp.dest('build/images'))
        .pipe(livereload())
});

gulp.task('js', function() {
    gulp.src('js/*')
        .pipe(gulp.dest('build/js'))
        .pipe(livereload())
});

gulp.task('watch', ['build'], function() {

    livereload.listen();

    gulp.watch('jade/**/*.jade', ['html']);
    gulp.watch('sass/*.sass', ['css']);
    gulp.watch('images/*', ['images']);
    gulp.watch('js/*.js',['js']);

});

gulp.task('build', ['html', 'css', 'images', 'js']);

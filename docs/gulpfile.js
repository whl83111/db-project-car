const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

gulp.task('default', function () {
    gulp.src("pug/index.pug")
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('.'))
    gulp.src("sass/main.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});
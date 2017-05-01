const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

gulp.task('default', function() {
    // Run ESLint
    gulp.src(["es6/**/*.js", "public/es6/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format());
    
    // Node source
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/js"));
    gulp.src("sass/**/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
    gulp.src("pug/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest('dist'))
    
    // Browser source
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist/js"));
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist/js"));
    gulp.src("pug/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest('public/dist'))
});
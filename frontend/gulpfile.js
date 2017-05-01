const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function() {
    // Node source
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/js"))
    // Browser source
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist/js"))
});
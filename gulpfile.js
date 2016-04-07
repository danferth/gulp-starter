var Promise = require('es6-promise').Promise;
//variables
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    csswring        = require('csswring'),
    sourcemaps      = require('gulp-sourcemaps');
    

//default task

gulp.task('default',['watch']);

//stylesheet
gulp.task('build-css',function(){
    var processors = [autoprefixer({browsers:['last 2 version']}),csswring];
    var build_processors = [csswring];
    return gulp.src('assets/scss/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'));
});


//watch
gulp.task('watch',function(){
    gulp.watch('assets/scss/**', ['build-css']);
});
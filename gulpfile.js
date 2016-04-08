var Promise = require('es6-promise').Promise;
//variables
var 
    src             = "assets/dev",
    dest            = "assets/build",
    gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    csswring        = require('csswring'),
    sourcemaps      = require('gulp-sourcemaps'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify');
    

//default task

gulp.task('default',['watch']);

//stylesheet
gulp.task('build-css',function(){
    var processors = [autoprefixer({browsers:['last 2 version']}),csswring];
    var build_processors = [csswring];
    return gulp.src(src + '/scss/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest + '/css'));
});

gulp.task('build-js', function(){
    return gulp.src([src+'/lib/**',src+'/js/**'])
        .pipe(concat('site.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/js'));
});


//watch
gulp.task('watch',function(){
    gulp.watch(src + '/scss/**', ['build-css']);
});
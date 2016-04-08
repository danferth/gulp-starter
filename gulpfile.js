var Promise = require('es6-promise').Promise;
//variables
var 
    dev_src         = "assets/dev",
    css_dest        = "assets/css",
    js_dest         = "assets/js",
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
    return gulp.src(dev_src + '/scss/global.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(css_dest));
});

gulp.task('build-js', function(){
    return gulp.src([dev_src+'/lib/**',dev_src+'/js/**'])
        .pipe(concat('site.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(js_dest));
});


//watch
gulp.task('watch',function(){
    gulp.watch(dev_src + '/scss/**', ['build-css']);
});
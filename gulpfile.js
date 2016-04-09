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
    uglify          = require('gulp-uglify'),
    filesize        = require('gulp-filesize'),
    jshint          = require('gulp-jshint'),
    sasslint        = require('gulp-sass-lint'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant');
    

//default task

gulp.task('default',['watch']);

//stylesheet
//sourcemaps | sass | prefix | minimize | filesize
gulp.task('build-css',function(){
    var processors = [autoprefixer({browsers:['last 2 version']}),csswring];
    var build_processors = [csswring];
    return gulp.src(src + '/scss/global.scss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest + '/css'))
    .pipe(filesize());
});

//javascript

//concat | jshint | filesize
gulp.task('js', function(){
    return gulp.src([src+'/lib/**',src+'/js/**'])
        .pipe(concat('site.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(dest + '/js'))
        .pipe(filesize())
});

//concat | sourcemaps | minimize | filesize
gulp.task('build-js', function(){
    return gulp.src([src+'/lib/**',src+'/js/**'])
        .pipe(concat('site.js'))
        .pipe(filesize())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest + '/js'))
        .pipe(filesize());
});

//images
gulp.task('image', function(){
    return gulp.src(src + '/img/**')
    .pipe(imagemin({
        progressive: true,
        svgPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(dest + "/images"))
});





//watch
gulp.task('watch',function(){
    gulp.watch(src + '/scss/**', ['build-css']);
    gulp.watch([src + 'lib/**/**', src + '/js**/**'],['js']);
});
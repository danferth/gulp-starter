var Promise = require('es6-promise').Promise;
var 
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
    pngquant        = require('imagemin-pngquant'),
    del             = require('del'),
    args            = require('yargs').argv;

//========options========
var src         = "assets/dev",
    dest        = "assets/build",
    
    css_file    = "global",
    css_src     = src + "/scss/" + css_file + ".scss",
    css_dest    = dest + "/css",
    
    js_file     = "site.js",
    js_lib_src  = src + "/lib",
    js_src      = src + "/js",
    js_dest     = dest + "/js",
    
    image_src   = src + "/img",
    image_dest  = dest + "/images";

//========default task========
gulp.task('default',['watch']);


//========================
//==========help==========
//========================
gulp.task('help', function(){
    console.log("clean = delete contents of build folder");
    console.log("build-css = sourcemaps | sass | prefix | minimize | filesize");
    console.log("js = concat | jshint | filesize");
    console.log("build-js = concat | sourcemaps | minimize | filesize");
    console.log("images = optimize images and save to build dir");
    console.log("watch = build-css && js");
});

//clean
gulp.task('clean', function(){
    return del([
        dest + '/**/*'
        ]);
});

//=========stylesheet===========
//sourcemaps | sass | prefix | minimize | filesize
gulp.task('build-css',function(){
    var processors = [autoprefixer({browsers:['last 2 version']}),csswring];
    //var build_processors = [csswring];
    return gulp.src(css_src)
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(css_dest))
    .pipe(filesize());
});

//=======javascript========
//concat | jshint | filesize
gulp.task('js', function(){
    return gulp.src([js_lib_src +'/**',js_src + '/**'])
        .pipe(concat(js_file))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(js_dest))
        .pipe(filesize());
});

//concat | sourcemaps | minimize | filesize
gulp.task('build-js', function(){
    return gulp.src([js_lib_src +'/**',js_src + '/**'])
        .pipe(concat(js_file))
        .pipe(filesize())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(js_dest))
        .pipe(filesize());
});

//========images========
gulp.task('image', function(){
    return gulp.src(image_src + '/**')
    .pipe(imagemin({
        progressive: true,
        svgPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(image_dest));
});

//========watch==========
gulp.task('watch',function(){
    gulp.watch(src + '/scss/**', ['build-css']);
    gulp.watch([src + 'lib/**/**', src + '/js**/**'],['js']);
});
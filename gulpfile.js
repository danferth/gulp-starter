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
    argv            = require('yargs').argv,
    colors          = require('colors'),
    gulpif          = require('gulp-if'),
    changed         = require('gulp-changed');

//========options=========================================================
var src         = "assets/dev",
    dest        = "assets/build",
    
    //css locations
    css_file    = "global",
    css_src     = src + "/scss/" + css_file + ".scss",
    css_watch   = src + "/scss/**/**",
    css_dest    = dest + "/css",
    
    //js locations
    js_file     = "site.js",
    js_lib_src  = src + "/lib",
    js_src      = src + "/js",
    js_dest     = dest + "/js",
    
    //image locations
    image_src   = src + "/img",
    image_dest  = dest + "/images";

//========default task=========================================================
gulp.task('default',['watch']);

//=================================================================================
//==========help===================================================================
//=================================================================================
gulp.task('help', function(){
  console.log("=============================================================".bold.green);
  console.log("clean           = delete contents of build folder".red);
  console.log("css             = sourcemaps | sass | prefix | minimize | filesize".cyan);
  console.log("js              = concat | jshint | filesize".yellow);
  console.log("js --production = concat | sourcemaps | minimize | filesize".yellow);
  console.log("images          = optimize images and save to build dir".grey);
  console.log("watch (default) = build-css && js".bold.green);
  console.log("=============================================================".bold.yellow);
});

//clean
gulp.task('clean', function(){
   return del([
      dest + '/**/*'
    ]);
});

//=========stylesheet====================================================================
//sourcemaps | sass | prefix | minimize | filesize
gulp.task('css',function(){
  var processors = [autoprefixer({browsers:['last 2 version']}),csswring];
  return gulp.src(css_src)
  .pipe(changed(css_dest))
  .pipe(sasslint())
  .pipe(sasslint.format())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(css_dest))
  .pipe(filesize());
});

//=======javascript=================================================================
//concat | jshint | filesize
//(--production) concat | sourcemaps | minimize | filesize
gulp.task('js', function(){
  return gulp.src([js_lib_src +'/**',js_src + '/**'])
  .pipe(changed(js_dest))
  .pipe(concat(js_file))
  
  .pipe(gulpif(argv.production, filesize()))
  .pipe(gulpif(argv.production, sourcemaps.init()))
  .pipe(gulpif(argv.production, uglify()))
  .pipe(gulpif(argv.production, sourcemaps.write()))
  .pipe(gulpif(!argv.production, jshint.reporter('jshint-stylish')))
  
  .pipe(gulp.dest(js_dest))
  .pipe(filesize());
});

//========images=================================================================
gulp.task('image', function(){
  return gulp.src(image_src + '/**')
  .pipe(imagemin({
      progressive: true,
      svgPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  }))
  .pipe(gulp.dest(image_dest));
});

//========watch===================================================================
gulp.task('watch',function(){
  gulp.watch(css_watch, ['css']);
  gulp.watch([js_lib_src + '/**/**', js_src + '/**/**'],['js']);
});



//=========BUILD========================================================
gulp.task('build',['css', 'js', 'image']);
//======TEST=========================================================

gulp.task('testme', function(){
  console.log("====| this is a test |====".bold.green);

  if(argv.production){
    console.log("let's do this");
  }

  console.log("====| test complete! Hope it worked out :o) |====".bold.red);
});
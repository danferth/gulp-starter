var Promise         = require('es6-promise').Promise,
    gulp            = require('gulp'),
    colors          = require('colors'),
    filesize        = require('gulp-filesize'),
    del             = require('del'),
    argv            = require('yargs').argv,
    gulpif          = require('gulp-if'),
    changed         = require('gulp-changed'),
    sourcemaps      = require('gulp-sourcemaps'),
    postcss         = require('gulp-postcss'),
    sass            = require('gulp-sass'),
    sasslint        = require('gulp-sass-lint'),
    autoprefixer    = require('autoprefixer'),
    csswring        = require('csswring'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    jshint          = require('gulp-jshint'),
    imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
    mkdirp          = require('mkdirp'),
    createFile      = require('create-file');
//=======options==============================================================================
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

//=======Start================================================================================
//this is working to create directories but i need files too so check this out in the morning:
//https://www.npmjs.com/package/create-file

gulp.task('start', function(){
  mkdirp('assets/build', function(err){
    (err) ? console.log(err) : console.log("Build passed");
  });
  mkdirp('assets/build/js', function(err){
    (err) ? console.log(err) : console.log("js passed");
  });
  mkdirp('assets/build/css', function(err){
    (err) ? console.log(err) : console.log("css passed");
  });
  mkdirp('assets/build/img', function(err){
    (err) ? console.log(err) : console.log("now get to work!".bold.green);
  });
});

gulp.task('create', function(){
  createFile(js_src + '/test.js', '//this is a comment yo!', function(err){
    (err) ? console.log(err) : console.log("js file created".yellow);
  });
});


//=======default task=========================================================================
gulp.task('default',['watch']);

//=======help=================================================================================
gulp.task('help', function(){
  console.log("=============================================================".bold.green);
  console.log("clean              = delete contents of build folder".red);
  console.log("css                = sourcemaps | sass | prefix | minimize | filesize".cyan);
  console.log("js                 = concat | jshint | filesize".yellow);
  console.log("js --production    = concat | sourcemaps | minimize | filesize".yellow);
  console.log("image              = optimize images and save to build dir".magenta);
  console.log("watch (default)    = css && js".bold.green);
  console.log("build              = css, js --production & image".grey);
  console.log("build --production = css, js --production & image".inverse);
  console.log("=============================================================".bold.yellow);
});

//=======clean================================================================================
gulp.task('clean', function(){
   return del([
      dest + '/**/*'
    ]);
});

//=======stylesheet===========================================================================
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

//=======javascript===========================================================================
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

//=======images===============================================================================
gulp.task('image', function(){
  return gulp.src(image_src + '/**')
  .pipe(imagemin({
      progressive: true,
      svgPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  }))
  .pipe(gulp.dest(image_dest));
});

//=======watch================================================================================
gulp.task('watch',function(){
  gulp.watch(css_watch, ['css']);
  gulp.watch([js_lib_src + '/**/**', js_src + '/**/**'],['js']);
});

//=======BUILD================================================================================
//pass argument --production i.e. $ gulp build --production
gulp.task('build',['css', 'js', 'image']);
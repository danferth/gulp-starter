# gulp-starter

After reinventing the wheel a few times I realized I just need a starting point with `gulp` to get the project going and can add to it as needed.

##Goal
To have a `gulpfile.js` & `package.json` that can be added to any project to get up and going with `gulp` in as little time as needed. Every project seems to have a different file structure these days when experimenting with `foundation` or `bootstrap` or `insert name of what not here`.  The top of the `gulpfile.js` are variables to set for the location of `src` and destination directories.  This way you can leave the rest of it alone and not have to hunt down directorey locations in the tasks.

**use `$ gulp help` to see a printout of the tasks available to you.**

```
=============================================================
clean               = delete contents of build folder
css                 = sourcemaps | sass | prefix | minimize | filesize
js                  = concat | jshint | filesize
js --production     = concat | sourcemaps | minimize | filesize
image               = optimize images and save to build dir
watch (default)     = css && js
build               = css, js & image
build --production  = css, js --production & image
=============================================================
```
###Dependancies Used
- es6-promise
- gulp
- colors
- del
- yargs
- gulp-if
- gulp-filesize
- gulp-changed
- gulp-sourcemaps
- gulp-postcss
- gulp-sass-lint
- gulp-sass
- autoprefixer
- csswring
- gulp-concat
- jshint
- gulp-jshint
- jshint-stylish
- gulp-uglify
- gulp-imagemin
- imagemin-pngquant
 
##How to Use

1. Fork or Download zip
2. You will only need three files `gulpfile.js`, `package.json` & `.sass-lint.yml`.  Place those in your projects root directory.
3. On your end install [`node`](https://docs.npmjs.com/getting-started/installing-node).
4. run `$ npm install` to get all the dependancies installed.
5. Edit variables section of `gulpfile.js` to set your projects `src` and `destination` directories.
6. In `terminal` run `$ gulp help` to see a list of the tasks available.
7. Edit as you see fit.

*This is a work in progress and can always like everything get entirely out of hand to the point of being just to specific and too large to use as a starting point.  At that pint this project will just be abandoned as it will just be another attempt at reinventing the wheel.*

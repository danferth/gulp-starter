# gulp-starter

After reinventing the wheel a few times I realized I just need a starting point with `gulp` to get the project going and can add to it as needed.

##Goal
To have a `gulpfile.js` & `package.json` that can be added to any project to get up and going with `gulp` in as little time as needed. Every project seems to have a different file structure these days when experimenting with `foundation` or `bootstrap` or `insert name of what not here`.  The top of the `gulpfile.js` are variables to set for the location of `src` and destination directories.  This way you can leave the rest of it alone and not have to hunt down directory locations in the tasks.

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
###Dependencies Used
- es6-promise *(for node to work)*
- gulp *(need gulp of course)*
- colors *(added for pretty console.log)*
- del *(to clean build directory)*
- yargs *(for arguments in command line)*
- gulp-if *(for conditionals in task)*
- gulp-filesize *(to report file size)*
- gulp-changed *(to only pass changed files down stream)*
- gulp-sourcemaps *(for sourcemaps)*
- gulp-postcss *(proccess css)*
- gulp-sass-lint *(lint scss)*
- gulp-sass *(compile scss to css)*
- autoprefixer *(add prefixes)*
- csswring *(mimify css)*
- gulp-concat *(concatinate js files)*
- jshint *(needed for gulp-jshint)*
- gulp-jshint *(hints on js errors)*
- jshint-stylish *(style output from gulp-jshint)*
- gulp-uglify *(mimify js)*
- gulp-imagemin *(image optimization for jpeg & svg)*
- imagemin-pngquant *(image optimization for png images)*
 
##How to Use

1. Fork or Download zip
2. You will only need three files `gulpfile.js`, `package.json` & `.sass-lint.yml`.  Place those in your projects root directory.
3. On your end install [`node`](https://docs.npmjs.com/getting-started/installing-node).
4. run `$ npm install` to get all the dependencies installed.
5. Edit variables section of `gulpfile.js` to set your projects `src` and `destination` directories.
6. In `terminal` run `$ gulp help` to see a list of the tasks available.
7. Edit as you see fit.

*This is a work in progress and can always like everything get entirely out of hand to the point of being just to specific and too large to use as a starting point.  At that pint this project will just be abandoned as it will just be another attempt at reinventing the wheel.*

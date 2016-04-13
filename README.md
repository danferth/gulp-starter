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


*This is a work in progress and can always like everything get entirely out of hand to the point of being just to specific and too large to use as a starting point.  At that pint this project will just be abandoned as it will just be another attempt at reinventing the wheel.*

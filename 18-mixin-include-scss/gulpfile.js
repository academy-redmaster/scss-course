const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

// Static server
gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});

// # task:scss
gulp.task("compile_scss", function (cb) {
    gulp.src("./src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                // options...
                outputStyle: "compressed",
                sourceMap: true
            }).on("error", sass.logError)
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./src/css"));
    cb();
});

gulp.task("watch", function (cb) {
    // ! watch scss
    gulp.watch("./src/scss/*.scss").on(
        "change",
        gulp.series("compile_scss", browserSync.reload)
    );
    // ! watch html
    gulp.watch("./src/*.html").on("change", browserSync.reload);
    cb();
});

// # task: default
gulp.task("default", gulp.series("compile_scss", "watch", "browser-sync"));

"use strict";

var gulp = require("gulp"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    sass = require("gulp-sass"),
    cssnano = require("gulp-cssnano"),
    rigger = require("gulp-rigger"),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    imagemin = require("gulp-imagemin"),
    eol = require("gulp-eol"),
    webserver = require("browser-sync");



/* Paths to source/build/watch files
=========================*/

var path = {
    build: {
        html: "build/",
        js: "build/js/",
        css: "build/css/",
        img: "build/img/",
        fonts: "build/fonts/"
    },
    src: {
        html: "src/*.html",
        js: "src/js/google_map.js",
        css: "src/sass/style.{scss,sass}",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    },
    watch: {
        html: "src/**/*.html",
        js: "src/js/google_map.js",
        css: "src/sass/**/*.{scss,sass}",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    }
};



/* Webserver config
=========================*/

var config = {
    server: "build/",
    notify: false,
    open: true,
    ui: false
};



/* Tasks
=========================*/

gulp.task("webserver", function () {
    webserver(config);
});


gulp.task("html:build", function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(eol())
        .pipe(gulp.dest(path.build.html))
        .pipe(webserver.reload({stream: true}));
});


gulp.task("css:build", function () {
    gulp.src(path.src.css)
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({browsers: [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
            ]})
        ]))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(webserver.reload({stream: true}));
});


gulp.task("js:build", function () {
    gulp.src(path.src.js)
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});


gulp.task("fonts:build", function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});


gulp.task("image:build", function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});


gulp.task("build", [
    "html:build",
    "css:build",
    "js:build",
    "fonts:build",
    "image:build"
]);


gulp.task("watch", function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start("html:build");
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start("css:build");
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start("js:build");
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start("image:build");
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start("fonts:build");
    });
});


gulp.task("default", ["build", "webserver", "watch"]);

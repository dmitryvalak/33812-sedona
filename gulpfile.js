var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    cssnano = require('gulp-cssnano'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin');


var path = {
    build: {
        html: './',
        js: 'js/',
        css: 'css/',
        img: 'img/',
        fonts: 'fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        css: 'src/scss/style.scss',
        img: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/scss/**/*.scss',
        img: 'src/i/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
};


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});


gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});


gulp.task('css:build', function () {
    gulp.src(path.src.css)
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssnano({zindex: false}))
        .pipe(gulp.dest(path.build.css))
});


gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});


gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});



gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'fonts:build',
    'image:build'
]);


gulp.task('watch', function() {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});



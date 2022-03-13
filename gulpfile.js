const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postCss = require('gulp-postcss');
const cssNano = require('cssnano');
const prefix = require('autoprefixer');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const SASS_PATH = 'src/sass/**/*.sass'; 
const JS_PATH = 'src/js/**/*.js'; 

// compile sass & minify task
function sassMin() {
    return src(SASS_PATH)
        .pipe(sass().on('error', sass.logError))
        .pipe(postCss([prefix('last 2 versions'), cssNano()]))
        .pipe(concat('main.min.css'))
        .pipe(dest('public/css'))
        .pipe(browserSync.stream());
}

// minify js task
function jsMin() {
    return src(JS_PATH)
        .pipe(terser())
        .pipe(dest('public/js'));
}

// browser-sync task
function watchTask() {
    browserSync.init({
        server: { baseDir: './' }
    });
    watch('*.html').on('change', browserSync.reload)
    watch(SASS_PATH, sassMin);
    watch(JS_PATH, jsMin);
}

// default gulp task
exports.default = series(
    sassMin,
    jsMin,
    watchTask,
);
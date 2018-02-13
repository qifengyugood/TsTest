var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var watchify = require("watchify");
var gutil = require("gulp-util");
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var babelpolyfill = require("babel-plugin-transform-runtime");

var paths = {
    pages: ['src/*.html'],
};


var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task('copyHtml', function () {
    return copyHtml();
});

function copyHtml() {
    return gulp.src(paths.pages)
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
}

function bundle() {
    return watchedBrowserify
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));

}


gulp.task('serve', function() {
    browserSync.init({
        server:{
            baseDir:'./',  // 设置服务器的根目录
            index:'dist/index.html' // 指定默认打开的文件
        },
        port:8050  // 指定访问服务器的端口号
    });
})

gulp.task('default', ['copyHtml','serve'], bundle);

gulp.watch(paths.pages,['copyHtml'])


watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);

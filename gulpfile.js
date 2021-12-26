const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
// const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}
function styles(){
    return src("app/scss/style.scss")
    .pipe(scss({outputStyle: "compressed"}))
    .pipe(concat("style.min.css"))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream())
}

function stylesSecondary() {
    return src([
        "node_modules/normalize.css/normalize.css",
        "node_modules/slick-carousel/slick/slick.css"
    ])
        .pipe(concat("_libs.scss"))
        .pipe(dest("app/scss"))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/slick-carousel/slick/slick.js",
        "app/js/main.js"
    ])
        .pipe(concat("main.min.js"))
        // .pipe(uglify())
        .pipe(dest("app/js"))
        .pipe(browserSync.stream())
}
function build() {
    return src([
        "app/css/style.min.css",
        "app/fonts/**/*",
        "app/images/**/*",
        "app/js/main.min.js",
        "app/*.html",
    ],
    {
        base: "app"
    })
    .pipe(dest("dist"))
}

function cleanDist() {
    return del("dist")
}

function watching() {
    watch(["app/scss/**/*.scss"], styles);
    watch(["app/js/**/*.js","!app/js/main.min.js"], scripts);
    watch(["app/*.html"]).on("change", browserSync.reload)
}
exports.styles = styles;
exports.stylesSecondary = stylesSecondary;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, build);
exports.default = parallel(styles, stylesSecondary, scripts ,browsersync, watching);

//Старая сборка
// let gulp = require("gulp"),
//     sass = require("gulp-sass"),
//     browserSync = require("browser-sync"),
//     uglify = require("gulp-uglify"),
//     concat = require("gulp-concat"),
//     rename = require("gulp-rename"),
//     del = require("del"),
//     autoprefixer = require("gulp-autoprefixer");

// gulp.task("scss", function () {
//     return gulp.src("app/scss/**/*.scss")
//         .pipe(sass({ outputStyle: 'compressed' }))
//         .pipe(autoprefixer({
//             overRideBrowsers: ['last 10 versions']
//         }))
//         .pipe(rename({ suffix: ".min" }))
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.reload({ stream: true }))
// });

// gulp.task("html", function () {
//     return gulp.src("app/*.html")
//         .pipe(browserSync.reload({ stream: true }))
// });

// gulp.task("script", function () {
//     return gulp.src("app/js/*.js")
//         .pipe(browserSync.reload({ stream: true }))
// });

// gulp.task("browser-sync", function () {
//     browserSync.init({
//         server: {
//             baseDir: "app/"
//         }
//     });
// });

// gulp.task("css", function () {
//     return gulp.src([
//         "node_modules/normalize.css/normalize.css",
//         "node_modules/slick-carousel/slick/slick.css"
//     ])
//         .pipe(concat("_libs.scss"))
//         .pipe(gulp.dest("app/scss"))
//         .pipe(browserSync.reload({ stream: true }))
// })

// gulp.task("js", function () {
//     return gulp.src([
//         "node_modules/slick-carousel/slick/slick.js"
//     ])
//         .pipe(concat("libs.min.js"))
//         .pipe(uglify())
//         .pipe(gulp.dest("app/js"))
//         .pipe(browserSync.reload({ stream: true }))
// });

// gulp.task("export", function () {
//     let buildHtml = gulp.src("app/**/*.html")
//         .pipe(gulp.dest("dist"))

//     let buildCss = gulp.src("app/css/**/*.css")
//         .pipe(gulp.dest("dist/css"))

//     let buildJs = gulp.src("app/js/**/*.js")
//         .pipe(gulp.dest("dist/js"))

//     let buildFonts = gulp.src("app/fonts/**/*.*")
//         .pipe(gulp.dest("dist/fonts"))

//     let buildImages = gulp.src("app/images/**/*.*")
//         .pipe(gulp.dest("dist/images"))
// })

// gulp.task("clean", async function () {
//     del.sync("dist")
// })

// gulp.task("watch", function () {
//     gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"))
//     gulp.watch("app/*.html", gulp.parallel("html"))
//     gulp.watch("app/js/*.js", gulp.parallel("script"))
// });

// gulp.task("build", gulp.series("clean", "export"))

// gulp.task("default", gulp.parallel("css", "scss", "js", "browser-sync", "watch"));
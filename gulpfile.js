const gulp = require("gulp");
const { src, dest, parallel, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const del = require("del");
const zip = require("gulp-zip");
const rename = require("gulp-rename");
const fileInclude = require("gulp-file-include");
const imageMin = require("gulp-imagemin");
const packageJson = require("./package.json");
const htmlBeauty = require("gulp-html-beautify");
const htmlWatcher = ["./pages/**/*.*", "./blocks/**/*.*"];
const htmlDir = {
  src: "./pages/*",
  dest: "./",
};
const scssDir = {
  src: "./assets/sass/**/*.*",
  dest: "./assets/css",
};

const replaceProjectFiles = () => {
  return gulp
    .src("./**/packageName__.*")
    .pipe(
      rename((path) => {
        path.basename = path.basename.replace(
          "packageName__",
          packageJson.name
        );
      })
    )
    .pipe(gulp.dest("./"));
};

const cleanUp = () => {
  return del("**/packageName__.*");
};

const makeFileInclude = () => {
  const options = {
    prefix: "@@",
    basepath: "@file",
  };
  return src(htmlDir.src).pipe(fileInclude(options)).pipe(dest(htmlDir.dest));
};

const makeCss = () => {
  const options = {
    outputStyle: "expanded",
    indentType: "space",
    indentWidth: 2,
    sourceMap: true,
  };
  sass.compiler = require("node-sass");
  return src(scssDir.src)
    .pipe(sass(options).on("error", sass.logError))
    .pipe(dest(scssDir.dest))
    .pipe(browserSync.stream());
};

const makeServer = () => {
  browserSync.init({
    server: "./",
  });

  gulp.watch("./assets/sass/**/*.scss", parallel([makeCss]));
  gulp.watch(htmlWatcher, parallel([makeFileInclude]));
  gulp
    .watch(["./*.html", "./assets/js/**/*.*"])
    .on("change", browserSync.reload);
};

exports.default = series([
  replaceProjectFiles,
  cleanUp,
  makeFileInclude,
  makeCss,
  makeServer,
]);

exports.makeBeautifulHtml = () => {
  const options = [
    {
      indent_size: 4,
      indent_with_tabs: false,
    },
  ];
  return src(["./*.html"]).pipe(htmlBeauty(options)).pipe(dest("./"));
};

const compressImage = () => {
  const options = [
    imageMin.gifsicle({ interlaced: true }),
    imageMin.mozjpeg({ quality: 75, progressive: true }),
    imageMin.optipng({ optimizationLevel: 5 }),
    imageMin.svgo({
      plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
    }),
  ];
  return src(["./assets/images/**/*.*"])
    .pipe(imageMin(options))
    .pipe(dest("./assets/images/"))
    .pipe(browserSync.stream());
};

const makeZip = () => {
  return src([
    "./**/*.*",
    "!./.vscode",
    "!./{pages,pages/**}",
    "!./{blocks,blocks/**}",
    "!./{.DS_Store,.DS_Store/**}",
    "!./{node_modules,node_modules/**}",
    "!./{vendor,vendor/**}",
    "!./{.git,.git/**}",
    "!./.stylelintrc.json",
    "!./.eslintrc",
    "!./.gitattributes",
    "!./.github",
    "!./.gitignore",
    "!./README.md",
    "!./composer.json",
    "!./composer.lock",
    "!./package-lock.json",
    "!./package.json",
    "!./.travis.yml",
    "!./yarn.lock",
    "!./style.css.map",
    "!./gulpfile.js",
  ])
    .pipe(zip(packageJson.name + ".zip"))
    .pipe(dest("./"));
};

exports.makeBundle = series([compressImage, makeZip]);

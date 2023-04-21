const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

// Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done) {
  src("src/scss/**/*.scss") //identificar  el archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass()) //compilarlo
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/css")); //almacenarlo en el disco duro

  done(); //calback que avisa a gulp cuando llegamos al final
}

function imagenes(done) {
  const opciones = {
    optimizationLevel: 3,
  };

  src("img/**/*.{png,jpg}") //identificar
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"));

  done();
}

function versionWebp(done) {
  const opciones = {
    quality: 50,
  };
  src("img/**/*.{png,jpg}") //identificar  el archivo img
    .pipe(webp(opciones)) //convertirlo a formato webp
    .pipe(dest("build/img")); //almacenarlo en el disco duro
  done();
}

function versionAvif(done) {
  const opciones = {
    quality: 50,
  };
  src("img/**/*.{png,jpg}") //identificar  el archivo img
    .pipe(avif(opciones)) //convertirlo a formato webp
    .pipe(dest("build/img")); //almacenarlo en el disco duro
  done();
}

function javascript(done) {
  src("src/js/**/*.js") //identificar  el archivo
    .pipe(dest("build/js"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", css);
  watch("src/js/**/*.js", javascript);
  done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);

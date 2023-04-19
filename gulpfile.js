const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
  src("src/scss/app.scss") //identificar  el archivo SASS
    .pipe(sass()) //Compilarlo
    .pipe(dest("build/css")); //Almacenarlo en el disco duro

  done(); //calback que avisa a gulp cuando llegamos al final
}

exports.css = css;

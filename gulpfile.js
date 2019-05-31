const { src, dest, parallel, watch, series } = require('gulp')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso')
const concat = require('gulp-concat')
const exec = require('child_process').exec
const log = require('fancy-log')


function css() {
  return src('scss/theme/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('css/theme'))
}

function js() {
  return src('client/javascript/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))
}

function reveal(cb) {
  exec('reveal-md osmi.md --css css/theme/osmi.css --template=custom.html -w', function(err, stdout, stderr) {
    log(stdout)
    log.error(stderr)
    cb(err)
  })
}

function watchFiles(cb) {
  watch("scss/**/*", css)
  cb()
}

exports.js = js
exports.css = css
exports.reveal = reveal
exports.default = series(css, parallel(reveal, watchFiles))

const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
// const concat = require('gulp-concat')
const del = require('del')


gulp.task('server', ['watch'], function server() {

  return gulp.src(['./'])
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false
    }))
})

gulp.task('clean', function clean() {
  return del(['dist'])
})

gulp.task('css', ['clean'], function css() {

  return gulp.src('src/css/*.css')
    .pipe(gulp.dest('dist/css'))
})

gulp.task('js', ['clean'], function js() {

  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['css', 'js'], function build() {

  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({presets: ['es2015', 'react'], plugins: ['transform-object-rest-spread']}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['build'], function _watch() {

  watch('src/**/*', batch((events, done) => gulp.start('build', done)))
})

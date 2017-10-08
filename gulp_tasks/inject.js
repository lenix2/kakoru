const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const gulpInject = require('gulp-inject');

const conf = require('../conf/gulp.conf');

gulp.task('inject', inject);

function inject() {
  const injectScripts = gulp.src([
      '.tmp/index.js',
      '.tmp/app/filter/**/*.js',
      '.tmp/app/containers/**/*.js',
      '.tmp/app/components/**/*.js',
      '.tmp/**/*.js',
    `!${'.tmp/**/*.spec.js'}`
  ]);

  const injectOptions = {
    ignorePath: ['src/','.tmp/'],
    addRootSlash: false
  };

  return gulp.src('src/index.html')
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest('.tmp/'))
    .pipe(browserSync.stream());
}

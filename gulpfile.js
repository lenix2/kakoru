const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');
const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('inject', gulp.series(gulp.parallel('styles', 'scripts'), 'inject'));
gulp.task('build', gulp.series('partials', gulp.parallel('inject', 'other'), 'build', 'images-build', 'fonts-build'));
gulp.task('test', gulp.series('scripts', 'karma:single-run'));
gulp.task('test:auto', gulp.series('watch', 'karma:auto-run'));
gulp.task('serve', gulp.series('clean', 'images', 'fonts', 'inject', 'reorder', 'watch', 'browsersync'));
gulp.task('war', gulp.series('towar'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

gulp.task('images', function() {
  return gulp.src([
    '*.gif'])
    .pipe(gulp.dest('.tmp/res/'));
});

gulp.task('fonts', function() {
  return gulp.src([
    'bower_components/bootstrap/fonts/*.*'])
    .pipe(gulp.dest('.tmp/fonts/'));
});

gulp.task('images-build', function() {
  return gulp.src([
    '*.gif'])
    .pipe(gulp.dest('dist/res/'));
});

gulp.task('fonts-build', function() {
  return gulp.src([
    'bower_components/bootstrap/fonts/*.*'])
      .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('reorder', function() {
  return gulp.src(['.tmp/src/index.*'])
    .pipe(gulp.dest('.tmp/'));
});

function watch(done) {
  gulp.watch([
    conf.path.src('index.html'),
    'bower.json'
  ], gulp.parallel('inject'));

  gulp.watch(conf.path.src('app/**/*.html'), gulp.series('partials', reloadBrowserSync));
  gulp.watch([
    conf.path.src('**/*.less'),
    conf.path.src('bower_components/**/*.less'),
    conf.path.src('**/*.css')
  ], gulp.series('styles'));
  gulp.watch(conf.path.src('**/*.js'), gulp.series('inject'));
  done();
}

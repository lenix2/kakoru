var gulp = require('gulp');
var war  = require('gulp-war');
var zip  = require('gulp-zip');

gulp.task('towar', towar);

function towar() {
  return gulp.src(["dist/**/*.*"])
    .pipe(war({
      welcome    : 'index.html',
      displayName: 'app'
    }))
    .pipe(zip('app.war'))
    .pipe(gulp.dest("./war"));
};

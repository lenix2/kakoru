var gulp = require('gulp');
var war  = require('gulp-war');
var zip  = require('gulp-zip');

gulp.task('towar', towar);

function towar() {
  return gulp.src(["dist/**/*.*"])
    .pipe(war({
      welcome    : 'index.html',
      displayName: 'timesheets'
    }))
    .pipe(zip('timesheets.war'))
    .pipe(gulp.dest("./war"));
};

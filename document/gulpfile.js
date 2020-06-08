const gulp = require('gulp')
const path = require('path')

// var pump = require('pump');//执行任务报错输出详细错误信息
gulp.task('copy-examples', function () {
  return gulp.src(path.resolve(__dirname, '../', 'dist/**/*'))
    .pipe(gulp.dest('dist/examples'))
})
var gulp = require('gulp'), 
    $ = require('gulp-load-plugins')();

gulp.task('server', function() {
  gulp.src('./dist/')
    .pipe($.webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('js', function() {
  gulp.src('./src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/'))
});

gulp.task('pug', () => {
  return gulp.src(['./src/pug/**/*.pug'])
  .pipe($.pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function(){
  gulp.src('./src/sass/**/*.scss')
    .pipe($.sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./dist/css/'));
});

 gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['change']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/pug/**/*.pug', ['pug']);
  // gulp.watch(['src/js/**/*.js','src/sass/**/*.scss','src/index.html']); 
});

gulp.task('deploy', () => {
  return gulp.src('./src/**/*')
    .pipe($.ghPages({
      remoteUrl: ""
    }));
});

  gulp.task('default', ['watch','server']);

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('compass', function () {
    return gulp.src('sass/*.scss')
    // .pipe(order( ['assets/sass/other_sass/*.scss', 'assets/sass/*.scss', 'assets/sass/other_sass/a.scss'], {base: ''}))
    .pipe(sourcemaps.init())
        .pipe(compass({
            config_file: 'pongup/config.rb',
            // project: path.join(__dirname, 'assets'),
            import_path: ['pongup/static/css', 'pongup/sass'],
            // require: 'bootstrap-sass',
            debug: false,
            style: 'compressed',
            sourcemap: true,
            css: 'pongup/static/css',
            sass: 'pongup/sass'
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/css'));
});

gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});
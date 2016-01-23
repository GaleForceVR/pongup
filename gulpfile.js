var gulp = require('gulp')
    ,gutil = require('gulp-util')
    ,concat = require('gulp-concat')
    ,livereload = require('gulp-livereload')
    ,sass = require('gulp-sass')
    ,compass = require('gulp-compass')
    ,sourcemaps = require('gulp-sourcemaps')
    ,browserify = require('browserify')
    ,watchify = require('watchify')
    ,babelify = require('babelify')
    ,babelReact = require('babel-preset-react')
    ,es2015 = require('babel-preset-es2015')
    ,stage1 = require('babel-preset-stage-1')
    ,source = require('vinyl-source-stream')
    ,buffer = require('vinyl-buffer')
    ,uglify = require('gulp-uglify')
    ,connect = require('gulp-connect')
    ;

function Error(err) {
  //notifier.notify({message: 'Error: ' + err.message});
  gutil.log(gutil.colors.bgCyan('***************** Error Report ****************'));
  gutil.log(gutil.colors.red('File Name: ' + err.fileName));
  gutil.log(gutil.colors.red('Error: ' + err.message));
  gutil.log(gutil.colors.red('Line Number: ' + err.lineNumber));
  gutil.log(gutil.colors.red('Reason: ' + err.reason));
};

// Bundle Scripts

function bundleScripts(file) {
    var opts = {
        entries: ['pongup/static/js/browserify/main.js'],
        debug: true,
        extensions: ['.jsx'],
        cache: {},
        packageCache: {},
        plugin: [watchify]
    };
    var b =  browserify(opts);
    // b.plugin('tsify', {
    //     noImplicitAny: true,
    //     jsx: 'react'
    //     //,target: 'es6'
    //     ,module: 'commonjs'
    // });
    b.transform(babelify, {presets: [es2015, babelReact, stage1]});
    b.on('update', function(){
        rebundle();
        gutil.log('Rebundling...');
    });
    function rebundle(){
        return b.bundle()
            .on('error', Error)
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./pongup/static/js/min-js/'))
            .on('end', function(){
                gutil.log('Bundle Complete');
            })
    };
    return rebundle();
};

function prodBundleScripts() {
    var opts = {entries: ['pongup/static/js/browserify/main.js'],extensions: ['.jsx'],cache: {},packageCache: {}}
    var b =  browserify(opts);
    // b.plugin('tsify', {
    //     noImplicitAny: true,
    //     jsx: 'react'
    // });
    b.transform(babelify, { presets: [es2015, babelReact, stage1] });
    function prodBundle(){
        return b.bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
            .pipe(uglify({compress: true})).on('error', Error)
            .pipe(gulp.dest('./pongup/static/js/min-js/'))
    };
    return prodBundle();
}

// END Bundle Scripts

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 7000,
    });
});

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

gulp.task('bundle', function(){
    return bundleScripts()
        .on('end', function(){
            gutil.log('Watching browserify files...');
        })
});

gulp.task('prodBundle', function(){
    return prodBundleScripts()
        .on('end', function(){
            gutil.log('Production bundle complete. ')
        })
})

// gulp.task('watch', ['connect'] , function () {
//     gutil.log('Watching Javascript Files...')
//     gulp.watch('pongup/static/js/*/*.js', ['devGlobalJs']);
//     // gulp.watch('assets/js/logged_in/*.js', ['devLoggedInJs']);
//     // gulp.watch('assets/js/staff/*.js', ['devStaffJs']);
//     // gulp.watch('assets/js/head/*.js', ['devHeadJs']);
//     // gulp.watch('assets/sass/*.scss', ['cssSplit']);
//     // gulp.watch('assets/css/global.css', ['cssSplit']);
// });

// gulp.task('default', function() {
//     return gutil.log('Gulp is running!')

// });
gulp.task('default', ['compass', 'bundle'/*, 'watch'*/]);

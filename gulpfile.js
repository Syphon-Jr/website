/*
* To install the required packages
* npm install --save-dev gulp-imagemin gulp-clean-css gulp-rename gulp-minify gulp-jshint jshint gulp-htmlmin
*/

'use strict'

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const minify = require('gulp-minify');
const jshint = require('gulp-jshint');
const htmlmin = require('gulp-htmlmin');

/////////////////These gulp tasks contains multiple tasks for easier usage//////

//do all the needed tasks below
gulp.task('default', ['images', 'cp', 'min'], () => {

});

//minify all images
//there are faulty jpeg images so I just copied the uploads folder
gulp.task('images', ['min-images','cp-uploads'], () => {

});

//copy php files, resources folder to dist
gulp.task('cp', ['cp-php', 'cp-res'], () => {

});

//minify html, css, js
gulp.task('min', ['min-js', 'min-css', 'min-html'], () => {

});

////////////////////Watchers//////////////////////////////////////////////////

gulp.task('watch-js', function () {
    gulp.watch('src/js/*.js', ['jshint']);
 });


/////////////////////////////////////////////////////////////////////////////
//copy resources file to dist
gulp.task('cp-res', () =>
    gulp.src('src/resources/**/*')
        .pipe(gulp.dest('dist/resources'))
);

//copy php files to dist
gulp.task('cp-php', () =>
    gulp.src('src/**/*.php')
        .pipe(gulp.dest('dist'))
);

//minify html in templates folder
gulp.task('min-html', function() {
    return gulp.src('src/templates/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(rename({suffix : '.min'}))
      .pipe(gulp.dest('dist/templates'));
});

//jshint
gulp.task('jshint', function() {
    return gulp.src('src/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});


//copy uploads folder to dist
gulp.task('cp-uploads', () =>
    gulp.src('src/uploads/**/*')
        .pipe(gulp.dest('dist/uploads'))
);

//minify js
gulp.task('min-js', () =>
    gulp.src('src/js/*')
        .pipe(minify({
            ext : {
                src:'.js',
                min:'.min.js'
            },
            noSource : true
        }))
        .pipe(gulp.dest('dist/js'))
);

//minify css
gulp.task('min-css', () =>
    gulp.src('src/css/*')
        .pipe(cleanCSS())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/css'))
);

//minify images in imagesfolder
gulp.task('min-images', () =>
    gulp.src([
            'src/images/**/*',
        ])
        .pipe(imagemin())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('dist/images'))
);

//minify images in uploadfolder
gulp.task('min-uploads', () =>
    gulp.src([
            'src/uploads/**/*.{jpg,JPG}'
        ])
        .pipe(imagemin({verbose : true}))
        .pipe(gulp.dest('dist/uploads'))
);

//Testing gulp here
gulp.task('test', function() {
    console.log('Hello world');
});

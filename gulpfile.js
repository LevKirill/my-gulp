const project_folder = 'dist';
const source_folder = '#src';

const path = {
    build: {
      html: project_folder + '/',
      css: project_folder + '/css/',
      js: project_folder + '/js/',
      img: project_folder + '/img/',
      fonts: project_folder + '/fonts/',
    },
    src: {
      html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
      css: source_folder + '/scss/style.scss',
      js: source_folder + '/js/script.js',
      img: source_folder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
      fonts: source_folder + '/fonts/*.ttf',
    },
    watch: {
      html: source_folder + '/**/*.html',
      css: source_folder + '/scss/**/*.scss',
      js: source_folder + '/js/**/*.js',
      img: source_folder + '/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}',
    },
    clean: './' + project_folder + '/'
  },

  {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del');

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, html);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

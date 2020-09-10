const { src , dest , watch , series , parallel } = require('gulp');

const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const del = require('del');


// css task
function css() {
	return src("./assets/sass/main.sass")
	.pipe(sass())
	.pipe(autoprefixer({ cascade: false, grid: true }))
	.pipe(concat('main.css'))
	.pipe(dest("./assets/css/"))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
	.pipe(concat('main.min.css'))
	.pipe(dest("./assets/css/"))
	.pipe(browserSync.reload({ stream: true }))
}

// js task
function js() {
	return src("./assets/js/main.js")
	.pipe(uglify())
	.pipe(concat('main.min.js'))
	.pipe(dest('assets/js/'))
	.pipe(browserSync.stream())
}

// browserSync task
function browsersync() {
	browserSync.init({
		//proxy: "http://localhost/...", -- для работы c локальным сервером
		server: { baseDir: "./" },
		notify: false, // Отключаем уведомления
		online: false // Подключение к Интернету: true или false
  });
}

// imagemin task
function ImageMin() {
	return src('assets/images/src/**/*')
	.pipe(newer('assets/images/dest/')) // проверка наличия изменений размера
	.pipe(imagemin())
	.pipe(dest('assets/images/dest/'))
}

// clean images/dest task
function cleanimg() {
	return del('assets/images/dest/**/*', { force: true })
}

// clean dist task
function cleandist() {
	return del('dist/**/*', { force: true }) 
}

// watch task
function watchTask() {
  watch("./assets/sass/**/*.sass", css)
  watch('./*.html').on('change',browserSync.reload);
  watch('./assets/js/**/*.js').on('change', browserSync.reload);
  watch('./assets/images/src/**/*', ImageMin);
}


// build task (public)
function buildTask() {
	return src([
		'./assets/css/**/*.min.css',
		'./assets/js/**/*.min.js',
		'./assets/images/dest/**/*',
		'./assets/libs/**/*',
		'./**/*.html',
		], { base: './' }) // Параметр "base" сохраняет структуру проекта при копировании
	.pipe(dest('dist'))
}



// ================ export tasks for CLI

exports.css = css; // $ gulp css
exports.js = js; // $ gulp js
exports.browsersync = browsersync; // $ gulp browsersync
exports.imagemin = ImageMin; // $ gulp imagemin
exports.cleanimg = cleanimg; // $ gulp cleanimg

exports.build = series(cleandist, css, js, ImageMin, buildTask);
exports.default = parallel(css, js, browsersync, watchTask); // $ gulp
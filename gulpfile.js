'use strict'

const { src, dest, watch } = require('gulp')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const merge = require('gulp-merge-media-queries')
const browserSync = require('browser-sync').create()

const compileSass = () =>
  src('resources/src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss([
      autoprefixer({ grid: true })
    ]))
    .pipe(merge())
    .pipe(dest('resources'))
    .pipe(postcss([
      cssnano()
    ]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('resources'))
    .pipe(browserSync.stream())

const serve = () => {
  browserSync.init({
    proxy: ''
  })

  watch('resources/src/scss/*.scss', compileSass)
  watch(['resources/*.php', 'resources/js/*.js', 'resources/*.js']).on('change', browserSync.reload)
}

exports.default = serve
'use strict'

const vfs = require('vinyl-fs')
const zip = require('gulp-vinyl-zip')
const path = require('path')

module.exports = (src, dest, bundleFileName, onFinish) => () =>
  vfs
    .src('**/*', { base: src, cwd: src })
    .pipe(zip.dest(path.join(dest, bundleFileName)))
    .on('finish', () => onFinish && onFinish(path.resolve(dest, bundleFileName)))

'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderEjs = require('./render-ejs');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

sh.find(srcPath).forEach(_processFile);

function _processFile(filePath) {
    if (
        filePath.match(/\.ejs$/)
        && !filePath.match(/includes/)
    ) {
        renderEjs(filePath);
    }
} 
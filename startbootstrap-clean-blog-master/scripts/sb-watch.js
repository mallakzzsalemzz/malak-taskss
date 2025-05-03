'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');
const upath = require('upath');
const renderAssets = require('./render-assets');
const renderPug = require('./render-pug');
const renderEjs = require('./render-ejs');
const renderScripts = require('./render-scripts');
const renderSCSS = require('./render-scss');

const watcher = chokidar.watch('src', {
    persistent: true,
});

let READY = false;

process.title = 'template-watch';
process.stdout.write('Loading');
let allPugFiles = {};
let allEjsFiles = {};

watcher.on('add', filePath => _processFile(upath.normalize(filePath), 'add'));
watcher.on('change', filePath => _processFile(upath.normalize(filePath), 'change'));
watcher.on('ready', () => {
    READY = true;
    console.log(' READY TO ROLL!');
});

_handleSCSS();

function _processFile(filePath, watchEvent) {
    
    if (!READY) {
        if (filePath.match(/\.pug$/)) {
            if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
                allPugFiles[filePath] = true;
            }    
        }
        if (filePath.match(/\.ejs$/)) {
            if (!filePath.match(/includes/)) {
                allEjsFiles[filePath] = true;
            }    
        }
        process.stdout.write('.');
        return;
    }

    console.log(`### INFO: File event: ${watchEvent}: ${filePath}`);

    if (filePath.match(/\.pug$/)) {
        return _handlePug(filePath, watchEvent);
    }

    if (filePath.match(/\.ejs$/)) {
        return _handleEjs(filePath, watchEvent);
    }

    if (filePath.match(/\.scss$/)) {
        if (watchEvent === 'change') {
            return _handleSCSS(filePath, watchEvent);
        }
        return;
    }

    if (filePath.match(/src\/js\//)) {
        return renderScripts();
    }

    if (filePath.match(/src\/assets\//)) {
        return renderAssets();
    }

}

function _handlePug(filePath, watchEvent) {
    if (watchEvent === 'change') {
        if (filePath.match(/includes/) || filePath.match(/mixins/) || filePath.match(/\/pug\/layouts\//)) {
            return _renderAllPug();
        }
        return renderPug(filePath);
    }
    if (!filePath.match(/includes/) && !filePath.match(/mixins/) && !filePath.match(/\/pug\/layouts\//)) {
        return renderPug(filePath);
    }
}

function _handleEjs(filePath, watchEvent) {
    if (watchEvent === 'change') {
        if (filePath.match(/includes/)) {
            return _renderAllEjs();
        }
        return renderEjs(filePath);
    }
    if (!filePath.match(/includes/)) {
        return renderEjs(filePath);
    }
}

function _renderAllPug() {
    console.log('### INFO: Rendering All Pug Files');
    _.each(allPugFiles, (value, filePath) => {
        renderPug(filePath);
    });
}

function _renderAllEjs() {
    console.log('### INFO: Rendering All EJS Files');
    _.each(allEjsFiles, (value, filePath) => {
        renderEjs(filePath);
    });
}

function _handleSCSS() {
    renderSCSS();
}
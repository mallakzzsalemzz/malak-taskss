'use strict';
const fs = require('fs');
const upath = require('upath');
const ejs = require('ejs');
const sh = require('shelljs');
const prettier = require('prettier');

module.exports = function renderEjs(filePath) {
    const destPath = filePath.replace(/src\/ejs\//, 'dist/').replace(/\.ejs$/, '.html');
    const srcPath = upath.resolve(upath.dirname(__filename), '../src');

    console.log(`### INFO: Rendering ${filePath} to ${destPath}`);
    
    // Read the EJS file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Render the EJS template
    const html = ejs.render(fileContent, {
        filename: filePath,
        root: srcPath + '/ejs'
    });

    const destPathDirname = upath.dirname(destPath);
    if (!sh.test('-e', destPathDirname)) {
        sh.mkdir('-p', destPathDirname);
    }

    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html',
        htmlWhitespaceSensitivity: 'ignore'
    });

    fs.writeFileSync(destPath, prettified);
}; 
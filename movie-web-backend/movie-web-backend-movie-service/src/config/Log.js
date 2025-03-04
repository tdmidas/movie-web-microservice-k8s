'use strict';

const fs = require('fs');
const path = require('path');

const folderPath = '../logs';
const HelmetFile = 'Helmet.log';
const ErrorFile = 'Error.log';
const Directory = path.join(__dirname, folderPath);

const HelmetLog = fs.createWriteStream(
    path.join(Directory, HelmetFile), {
        flags: 'a'
    }
)

const ErrorLog = fs.createWriteStream(
    path.join(Directory, ErrorFile), {
        flags: 'a'
    }
)


module.exports = {
    HelmetLog,
    ErrorLog,
}
var path = require('path');

var markedStream = require('../');

var example = path.join(__dirname, 'example.md');

var stream = markedStream(example);

stream.on('error', console.log);

stream.pipe(process.stdout)

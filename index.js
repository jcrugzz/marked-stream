var Readable = require('stream').Readable,
    pygmentize = require('pygmentize-bundled'),
    util = require('util'),
    fs = require('fs'),
    marked = require('marked');

//
// ### @function MarkedStream
// #### @path {String} Path to file you want to read
// #### @options {Object} Marked parser options
// Creates a `marked-stream` to recieve the an html stream from a path to
// a markdown file
//
var MarkedStream = function (path, options) {
  Readable.call(this, { encoding: 'utf8' });

  var self = this;

  options = options || {
    gfm: true,
    pedantic: false,
    sanitize: true,
    highlight: function(code, lang, callback) {
      pygmentize({ lang: lang, format: 'html' }, code, function (err, result) {
          callback(err, result.toString());
        });
    }
  };

  fs.readFile(path, 'utf8', this._encode.bind(this, options));

};

//
// Inherit from Readable Stream
//
util.inherits(MarkedStream, Readable);

//
// ### @private function _read(n)
//
MarkedStream.prototype._read = function (n) {};

//
// ### @private function _encode(options, err, text)
// #### @options {Object} Marked options passed in through partial application
// #### @err {Error} Possible error if bad path is passed in as argument
// #### @text {String} File contents of markdown file
// Continuation after asynchronously reading the file
MarkedStream.prototype._encode = function (options, err, text) {
  if (err) { return this.emit('error', err) }

  var md = marked(text, options);

  this.push(md, 'utf8');
  //
  // Remark: This is required so the stream calls the `end` event
  //
  this.push(null);

};

//
// Export a new insance of the stream
//
module.exports = function (path, options) {
  return new MarkedStream(path,  options);
};

# marked-stream

[![build status](https://secure.travis-ci.org/jcrugzz/marked-stream.png)](http://travis-ci.org/jcrugzz/marked-stream)

[![NPM](https://nodei.co/npm/marked-stream.png)](https://nodei.co/npm/marked-stream/)

Simple stream that takes a file path and returns a stream of html using
[`marked`][marked]. Contains sane defaults and highlighting with
[`node-pygmentize-bundled`][pygmentize].

## Example

```js
var path = require('path');

var markedStream = require('marked-stream');

var example = path.join(__dirname, 'example.md');

//
// You can also pass in `marked` options as second argument
//
var stream = markedStream(example);

stream.on('error', console.log);

stream.pipe(process.stdout)
```

With the following input:

```md
# Example

Here is an example Markdown file to use for the test

## Hello There
```

The previous example outputs the following:

```html
<h1>Example</h1>
<p>Here is an example Markdown file to use for the test</p>
<h2>Hello There</h2>
```


## Test

`npm test`

## License

MIT

[marked]: https://github.com/chjj/marked
[pygmentize]: https://github.com/rvagg/node-pygmentize-bundled

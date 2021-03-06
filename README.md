browserify-dustjs [![NPM Module](http://img.shields.io/npm/v/browserify-dustjs.svg?style=flat-square)](https://npmjs.org/package/browserify-dustjs) [![NPM Module](https://img.shields.io/npm/dm/browserify-dustjs.svg?style=flat-square)](https://npmjs.org/package/browserify-dustjs)
=================

browserify transform for dust template files

Install
-------
```bash
npm install browserify-dustjs --save-dev
```

Use
---
```js
var template = require("../views/template.dust");

template({title:"Browserify is Awesome!", mood:"happy"}, function(err, html) {
    // Deal with html
});

template(function(err, html) {
    // Also works without context
});
```

Transform
---------
To use it from the command line:
```bash
browserify -t browserify-dustjs file.js
```

To use it from node:
```js
var browserify = require('browserify');
var dustify = require('browserify-dustjs');

var b = browserify();
b.add('view.js');
b.transform(dustify);

b.bundle().pipe(process.stdout);
```

Note that by default `browserify-dustjs` transforms only `.dust` and `.html` files. You can add more extensions:
```js
...
// transform `.dust`, `.html`, and `.tpl` files
b.transform(dustify.configure('.tpl'));
...
```
or specify all extensions:
```js
...
// transform only `.dust` and `.tpl` files
b.transform(dustify.configure(['.dust', '.tpl']));
...
```
or both:
```js
...
// transform only `.dust`, `.tpl`, and `.xyz` files
b.transform(dustify.configure(['.dust', '.tpl']).configure('.xyz'));
...
```

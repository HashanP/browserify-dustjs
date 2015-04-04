browserify-dustjs
=================

browserify transform for dust template files

Install
-------
```bash
npm install browserify-dustjs --save-dev
```

Transform
---------
```js
var browserify = require('browserify');
var dustify = require('browserify-dustjs');

var b = browserify();
b.add('view.js');
b.transform(dustify);

b.bundle().pipe(process.stdout);
```

Note that by default `browserify-dustjs` transforms `.dust` and `.html` files.

You can add more extensions
```js
...
// transform `.dust`, `.html`, and `.tpl` files
b.transform(dustify.configure('.tpl'));
...
```
or specify all extensions
```js
...
// transform only `.dust` and `.tpl` files
b.transform(dustify.configure(['.dust', '.tpl']));
...
```
or both
```js
...
// transform only `.dust`, `.tpl`, and `.xyz` files
b.transform(dustify.configure(['.dust', '.tpl']).configure('.xyz'));
...
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

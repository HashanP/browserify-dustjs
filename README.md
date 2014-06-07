browserify-dustjs
=================

browserify transform for dust template files

Install:
```bash
npm install browserify-dustjs --save-dev
```

In JavaScript:
```js
var template = require("../views/template.dust");

template({title:"Browserify is Awesome!", mood:"happy"}, function(err, html) {
    // Deal with html
});

template(function(err, html) {
    // Also works without context
});
```

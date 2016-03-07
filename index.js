var path = require('path');

var through = require("through");
var dust = require("dustjs-linkedin");

var extensions = ['.dust', '.html'];
var leadsWithDot = /^\./;

var wrap = function (filename, template) {
  return 'var dust = require("dustjs-linkedin/lib/dust");' +
    'var helpers = require("dustjs-helpers").helpers;' +
    'dust.helpers = helpers;' +
    'module.exports = function(data, cb) {' +
    'if(!cb) {' +
    'cb = data;' +
    'data = {};' +
    '}' +
    'dust.render("' + filename + '", data, cb);' +
    '};' + template;
};

function dustTransform (file, opts) {
  if (extensions.indexOf(path.extname(file)) < 0){
    return through();
  }

	var c = process.cwd();
	if(opts.root) {
		c = opts.root;
	}

	var filename = path.relative(c, file);
	filename = filename.slice(0, filename.length - path.extname(filename).length);
  var input = "";
  var write = function(buffer) {
    input += buffer;
  };

  var end = function() {
    this.queue(wrap(filename, dust.compile(input, filename)));
    this.queue(null);
  };

  return through(write, end);
};

module.exports = dustTransform;

dustTransform.configure = function(ext) {
  if ('string' === typeof ext) {
    ext = ensureLeadsWithDot(ext);
    if (!~extensions.indexOf(ext)) {
      extensions.push(ext);
    }
  } else if (Array.isArray(ext)) {
    extensions = ext.map(ensureLeadsWithDot);
  }

  return dustTransform;
}

function ensureLeadsWithDot(str) {
  if (!leadsWithDot.test(str)) {
    return '.'+str;
  }
  return str;
}

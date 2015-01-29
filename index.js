var through = require("through");
var dust = require("dustjs-linkedin");

var filenamePattern = /\.(dust|html)$/,
    fileName = /\/.*\/(.*).(dust|html)$/;

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

module.exports = function (file) {
    if (!filenamePattern.test(file)) return through();

    file = file.match(fileName).slice(1);
    var input = "";
    var write = function(buffer) {
		input += buffer;
    };

    var end = function() {
		this.queue(wrap(file.join('.'), dust.compile(input, file)));
		this.queue(null);
    };

    return through(write, end);
};

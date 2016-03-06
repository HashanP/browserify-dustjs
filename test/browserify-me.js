var dust = require("dustjs-linkedin");
var template = require("./template.dust");
var fight = require("./fight.dust");

template({title:"Browserify Me!", mood:"happy"}, function(err, html) {
	if(err) {
		throw err;
	} else {
		console.log(html);
	}
});

var template = require("./template.dust");

template({title:"Browserify Me!", mood:"happy"}, function(err, html) {
	if(err) {
		throw err;
	} else {
		console.log(html);
	}
});

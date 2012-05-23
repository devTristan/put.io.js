put.io.js
=========

Put.io Javascript library for node.js and browser

If you're using it in the browser, you'll need jQuery.

It's really easy to use.

	var api = new PutIO(key, secret);
	
	api.files.list(function(items){
		for (var i in items) {
			console.log(items[i].name);
		}
	});

I wish there was more to say, but I'm afraid that's pretty much it.

put.io.js
=========

Put.io Javascript library for node.js and browser

If you're using it in the browser, you'll need jQuery.

It's really easy to use.

Node
----

	var PutIO = require('./put.io');

Browser
-------

	<script type="text/javascript" src="./put.io.js"></script>

And then...
-----------

	var api = new PutIO(key, secret);
	
	api.files.list(function(items){
		for (var i in items) {
			console.log(items[i].name);
		}
	});

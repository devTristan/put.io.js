var PutIO = function(key, secret){
	this.api_options = {
		hostname: 'api.put.io',
		path: '/v1/',
		method: 'GET'
		};
	this.api_key = key;
	this.api_secret = secret;
	
	var self = this;
	var publicData = {};
	
	var classInterface = function(name, mymethods){
		this.name = name;
		var output = {};
		for (var i in mymethods)
			{
			var method = mymethods[i];
			var classname = this.name;
			output[method] = (function(classname, method){return function(params, callback){
				params = params || {};
				callback = callback || function(){};
				self.run(classname, method, params, callback);
				}})(classname, method);
			}
		return output;
	};
	var methods = {
		'files': ['list', 'create_dir', 'info', 'rename', 'move', 'delete', 'search', 'dirmap'],
		'messages': ['list', 'delete'],
		'transfers': ['list', 'cancel', 'add'],
		'urls': ['analyze', 'extracturls'],
		'user': ['info', 'friends', 'acctoken'],
		'subscriptions': ['list', 'create', 'edit', 'delete', 'pause', 'info']
	};
	
	for (var classname in methods)
		{
		publicData[classname] = new classInterface(classname, methods[classname]);
		}
	
	this.browser = false;
	if (typeof process == 'undefined')
		{
		if (typeof jQuery == 'undefined')
			{
			console.error('We seem to be in the browser, but there\'s no jQuery. This library requires jQuery. Sorry, bro.');
			}
		else
			{
			this.browser = true;
			}
		}
	
	this.run = publicData.run = function(classname, method, params, callback){
		if (typeof params == 'function') {callback = params; params = {};}
		params = params || {};
		callback = callback || function(){};
		var request = {'api_key': self.api_key, 'api_secret': self.api_secret, 'params': params};
		var options = {};
		for (var field in self.api_options)
			{
			options[field] = self.api_options[field];
			}
		options.path += classname;
		options.path += '?method='+method+'&request='+JSON.stringify(request);
		var cb = function(data){
			if (data.error)
				{
				throw 'putioException';
				}
			else
				{
				callback(data.response.results);
				}
			};
		if (self.browser)
			{
			self.browser_request(options, cb);
			}
		else
			{
			self.node_request(options, cb);
			}
	};
	
	this.browser_request = function(options, callback){
		jQuery.getJSON('http://'+options.hostname+options.path+'&callback=?', callback);
	};
	
	this.node_request = function(options, callback){
		var http = require('http');
		http.request(options, function(res){
			res.setEncoding('utf8');
			var output = '';
			res.on('data', function (chunk) {
				output += chunk;
				});
			res.on('end', function(){
				output = JSON.parse(output);
				callback(output);
				});
			}).end();
	};
	
	return publicData;
}

if (typeof module != 'undefined') {exports = module.exports = PutIO;}

var http = require('http');
var orresponse = http.IncomingMessage;
const exec = require("child_process").exec;

var pageUrl = "http://example.com";
var proxy = "proxy"; //If you are behind a proxy
var port = 8080; //The proxy port
var timer = 120; //Checking timer in seconds

var options = {
  host: proxy,
  port: port,
  path: pageUrl,
};

var request = http.get(options, function(response) {
  orresponse = response;
}); 

rek();

function rek(){
	var request2 = http.get(options, function(response, err) {
		 if (err) {
			console.error('There was an error', err);
			return;
		}
		if (orresponse.text == response.text){
		  setTimeout(rek, 1000*timer);
		  var date = new Date;
		  console.log("Last checked: "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
		}
		else {
			console.log("Page changed");
			exec("start "+options.path);
		}
	}).on('error', function(e){
		console.log("There's a problem with the connection!");
		setTimeout(rek, 1000*timer);
	});
}

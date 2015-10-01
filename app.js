var http = require('http');
var express = require('express'),
    app = module.exports.app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);


var fs = require("fs");
var path = require("path");

 
app.use(express.static(path.join(__dirname, './public')));
 
server.listen(8080);
 
function handler(request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}
 
io.sockets.on('connection', function(socket) {
	socket.emit('login', {success: true});
	console.log('TV connected');
	broadcastInformations();
});


var p = './public/images/';
fs.watch(p, function (event, filename) {
	if(event == 'rename') {
		broadcastInformations();
	}

});

function broadcastInformations() {
	fs.readdir(p, function (err, files) {
	    if (err) {
	        throw err;
	    }

	    try {
		    var imageFiles = [];

		    files.sort(function(a, b) {
		        return fs.statSync(p + a).mtime.getTime() - 
		            fs.statSync(p + b).mtime.getTime();
	        }).map(function (file) {
		        return path.join(p, file);
		    }).filter(function (file) {
		        return fs.statSync(file).isFile();
		    }).forEach(function (file) {
		        imageFiles.push(file.replace("public/", ""));
		    });

		    io.sockets.emit('list', {currentList: imageFiles});

        } catch (e) {
        	broadcastInformations();
        }
	});
}
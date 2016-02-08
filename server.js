var path = require('path');

var http = require('http');
var server = http.createServer();

var express = require('express');
var app = express();

var socketio = require('socket.io');

// console.log("1: ", server);

server.on('request', app);

// console.log("2: ", server);

server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

// console.log("3: ", server);

var io = socketio(server);

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    // console.log("socket", socket);
    console.log(socket.id);
    

  socket.on('drawing', function(payload){
    console.log("server side payload: ",  payload);
    socket.broadcast.emit('drawingg', payload);
  });

    socket.on('disconnect', function () {
        console.log('A client has disconnected! ', socket.id);
    });
});



app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
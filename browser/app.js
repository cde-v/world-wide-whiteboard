// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('drawingg', function (payload) {
  console.log("received draw",payload);
  whiteboard.draw(payload, payload, null, true);
});

whiteboard.on('draw', function(payload){
  console.log("whiteboard drawing event received", payload);
  socket.emit('drawing', payload);
});


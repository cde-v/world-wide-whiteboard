// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);

socket.on('connect', function() {
  console.log('I have made a persistent two-way connection to the server!');

});

socket.on('drawingg', function(start, end, color) {
  console.log("on drawingg", start, end, color);
  whiteboard.draw(start, end, color);
});

whiteboard.on('draw', function(start, end, color) {
  console.dir(document.querySelector('#paint').getContext('2d'));
  console.log("on draw: ", start, end, color);
  socket.emit('drawing', {
    start: start,
    end: end,
    color: color
  });
});

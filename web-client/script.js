var socket = io();
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
function clicked_more() {
  console.log("web clicked more");
  socket.emit("web:server", {volume: "increase"}, function() {});
};
function clicked_less() {
  console.log("web click less");
  socket.emit("web:server", {volume: "decrease"}, function() {
  });
};


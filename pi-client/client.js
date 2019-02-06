var io = require('socket.io-client');
var socket = io('http://joshuayuan.me:8081');

socket.on('connect', function() {
  console.log("client connecting");
  socket.emit("pi:server", {msg: 'Hello Universe!'}, function(response) {
    console.log("connect pi to server complete");
  });
});

socket.on('server:pi', function(data, response) {
  console.log("PI receive from server:");
  console.log(data);
});


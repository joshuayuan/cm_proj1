var io = require('socket.io-client');
var socket = io('http://joshuayuan.me:8081');
var player = require('play-sound')(opts = {});


socket.on('connect', function() {
  console.log("client connecting");
  socket.emit("pi:server", {msg: 'Hello Universe!'}, function(response) {
    console.log("connect pi to server complete");
  });
});

socket.on('server:pi', function(data, response) {
  console.log("PI receive from server:");
  console.log(data);
  player.play('audio/audio1.mp3', {play: ''},  function(err) {
    if (err) throw err;
  });
});


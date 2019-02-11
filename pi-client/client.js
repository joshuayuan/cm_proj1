var io = require('socket.io-client');
var socket = io('http://joshuayuan.me:8081');
var player = require('play-sound')(opts = {});

var audios = [];


socket.on('connect', function() {
  console.log("client connecting");
  socket.emit("pi:server", {msg: 'Hello Universe!'}, function(response) {
    console.log("connect pi to server complete");
  });
});

socket.on('server:pi', function(data, response) {
  console.log("PI receive from server:");
  console.log(data);
  if (data.volume == "decrease") {
    var rand = Math.floor(Math.random() * audios.length);
    console.log("removing " rand + " of " + audios.length);
    var clip_remove = audios.splice(rand, 1)[0];
    clip_remove.kill();
  } else {
    var clip = player.play('audio/audio1.mp3', {play: ''},  function(err) {
      if (err) throw err;
    });
    audios.push(clip);
    console.log("added new audio");
  }
});


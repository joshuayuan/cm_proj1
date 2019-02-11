var app = require("express")();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8081);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/web-client/index.html');
});

app.get('/script.js', function(req, res) {
  res.sendFile(__dirname + '/web-client/script.js');
});

io.on('connection', function (socket) {
  socket.on("pi:server", function(data, callback) {
    console.log("connected from PI");
    callback();
  });
  socket.on('web:server', function (data, response) {
    console.log("Receive web:server with " + data);
    socket.broadcast.emit("server:pi", data);
    console.log("Done broadcasting");
  });
});


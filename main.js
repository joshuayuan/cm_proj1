var app = require("http").createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
app.listen(8081);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}

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


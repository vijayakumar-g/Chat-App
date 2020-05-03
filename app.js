require('dotenv').config()
/**requiring express module*/
var express = require("express");
var app = express();
/**requiring body-parser module*/
var bodyParser = require("body-parser");
/**requiring path module*/
var path = require("path");
/**requiring fs module**/
var fs = require('fs');
/**requiring http module**/
var http = require('http').Server(app);
/**requiring socket.io module**/
var io = require('socket.io')(http);
var router = express.Router();
var PORT = process.env.PORT || 3006;
/**mongo db is connected to store the database**/
var MongoClient = require('mongodb').MongoClient;

var url = "";

if(process.env.MG_USER) {
  url= `mongodb://${process.env.MG_USER}:${process.env.MG_PWD}@${process.env.MG_HOST}:${process.env.MG_PORT}/chatApp`;
}
else url = "mongodb://localhost:".concat(process.env.MG_PORT, "/chatApp");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


/*making the folder static to update the changes over there*/
app.use("/", express.static('./views'));
app.use(require('./controller/chat'));

MongoClient.connect(url, function(err, db)
{
/**sockets messages are received and the username are set to the
socket and the messages are broadcasted to every users**/
io.on('connection', function(socket) {
  socket.on('setUsername', function(data) {
    socket.emit('name', {
      username: data
    });
  });
  socket.on('msg', function(data) {
    db.collection("ChatHistory").insertOne(data);
    io.sockets.emit('newmsg', data);
  })
});
});
http.listen(PORT, function() {
  console.log("server is listening to %s port", PORT);
});

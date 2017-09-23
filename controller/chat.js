/**requiring express module*/
var express = require("express");

var app = express();
/**requiring body-parser module*/
var bodyParser = require("body-parser");
/**requiring path module*/
var path = require("path");

var redis = require('redis');

var online = [];

var redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/chatApp";

var function1 = require('../server_modules/db_signup.js');

var function2 = require('../server_modules/db_login.js');

var function3 = require('../server_modules/db_history.js');

var function4 = require('../server_modules/db_update.js');

var function5 = require('../server_modules/msgencode.js');

var router = express.Router();

app.post('/logging', function(req, res)
{
  res.setHeader("Content-Type", "application/json");
  function1.signup(MongoClient, url, req, res, function(result) {
  res.send(result);
  });
});

/**checking wther already a user is present or new user
  is logging into the system**/
app.post('/checkUserLogin', function(req, res)
{
  function2.checklogin(MongoClient, url, redisClient, req, res, function(result) {
    res.send(result);
  });
});

/**if new user then login into the system and then
generates a token and store the user name as key and token in redis**/
app.post('/login', function(req, res) {
  function2.login(MongoClient, url, redisClient,req,res, function(result) {
    res.send(result);
  });
});
/**loading the database to read the messages stored in the database
and it also retrieves the number of users connected
using the redis cache and sends to the user*/
app.get('/history', function(req, res)
{
  online = function3.online;
  function3.messagehistory(MongoClient, url, redisClient, req, res, function(result) {
    res.send(result);
  });
});
/**logout module clears all the local storage and then
clear the user name from redis so that user is removed
when that particular user logouts**/
app.post('/logout', function(req, res) {
  var index = online.indexOf(req.body.username);
  online.splice(index, 1);
  redisClient.del(req.body.username, function(err, reply) {
    if (err) console.error(err);
    res.send({
      status: true
    })
  });
});

/**changing the password or forgetting the password are
done by the this updating api**/
app.post('/updating', function(req, res) {
  res.setHeader("Content-Type", "application/json");
  function4.update(MongoClient, url, req, res, function(result) {
    res.send(result);
  });
});

app.post('/encode', function(req,res)
{
  function5.msgencode(req,res,function(result)
{
  res.send(result);
});
});
module.exports = app;

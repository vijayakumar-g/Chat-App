var redis = require('redis');

var redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});
var online=[];
var messagehistory=function(MongoClient,url,redisClient,req,res,callback)
{
MongoClient.connect(url, function(err, db)
  {
redisClient.keys('*',function(err,keys)
{
if(err)console.error(err);
online=keys;
db.collection("ChatHistory").find({}, {
  _id: false,
  message: true,
  user: true,
  time: true
}).toArray(function(err, data)
{
  if (err) throw err;
  callback({db:data,users:online});
});
});
});
}
module.exports.online=online;
module.exports.messagehistory=messagehistory;

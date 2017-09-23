/**requiring jsonwebtoken module to create a token on server side**/
var jwt = require('jsonwebtoken');
/**requiring uuid module to generate keys**/
var uuid = require('uuid');
/**requiring jwt-decode module to decode the tokens**/
var jwtDecode = require('jwt-decode');
/**v4 is random version where v1 timestamp will be taken as key**/
var secretKey = uuid.v4();


var checklogin=function(MongoClient,url,redisClient,req,res,callback)
{
  MongoClient.connect(url, function(err, db)
  {

   if (req.body.token == null || req.body.token == undefined || req.body.token == '')
    {
          callback({
    status: true
  });
    }
else if(token!=null)
{
  var decoded=jwtDecode(req.body.token)
      if(decoded.username==req.body.username)
      {
        redisClient.exists(decoded.username, function(err, reply)
        {
          if (err) console.error(err);
          if (reply == 1) {
            callback({
              status: "already present"
            });
          }
        })
      }
    else
    {
      console.log("coming if not same");
      callback({status: "new user"});
    }
  }
});
}

var login=function(MongoClient,url,redisClient,req,res,callback)
{
  MongoClient.connect(url, function(err, db)
  {
    db.collection("Storage").find({
    username: req.body.username,
  }).toArray(function(err, result)
  {
    if(result.length!=0)
    {
  db.collection("Storage").find({
  username: req.body.username,
  password: req.body.password
}).toArray(function(err, data) {
  if (err) console.error(err);
  if (data.length != 0)
  {
    var user = req.body.username;
    token = jwt.sign({
      username: req.body.username,
      expiresIn: 60 * 60
    }, secretKey);
    redisClient.hmset(user, 'token', token, function(err, reply) {
      if (err) console.error(err);
        })
    callback({
      "token": token,
      status: "newlogin",
      username: req.body.username
    });
  }
  else if (data.length == 0)
  {
    callback({
      status: "false",
      username: req.body.username
    });
  }
});
}
  else {
    callback({
      status: "register"
    });
      }
});
});
}
module.exports.checklogin=checklogin;
module.exports.login = login;

var signin=function(req,res,callback)
{
  var db = require('mongodb').MongoClient;

  console.log(req);
  res.setHeader("Content-Type", "application/json");
  db.collection("Storage").find({
    username: req.body.username
  }).toArray(function(err, data) {
    if (!err)
      if (data.length != 0)
      {
        callback({
          data: "false"
        });
      }
    else {
      db.collection("Storage").insertOne({
        username: req.body.username,
        password: req.body.password
      }, function(err, result) {
        if (err) throw err;
      });
      callback({
        data:"true"
      });
    }
  });
}
module.exports.signin = signin;

var signup=function(MongoClient,url,req,res,callback)
{
  MongoClient.connect(url, function(err, db)
  {
  db.collection("Storage").find({
    username: req.body.username
  }).toArray(function(err, data) {
    if (!err)
      if (data.length != 0)
      {
      callback ({
        data:"false"
      });
      }
    else {
      db.collection("Storage").insertOne({
        username: req.body.username,
        password: req.body.password
      }, function(err, result) {
        if (err) throw err;
      });
      callback(
        {
          data:"true"
        });
    }
  });
});
}
module.exports.signup = signup;

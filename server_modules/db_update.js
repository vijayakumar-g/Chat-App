var update=function(MongoClient,url,req,res,callback)
{
MongoClient.connect(url, function(err, db)
{
var name = {
username: req.body.username
};
var change_pwd = {
username: req.body.username,
password: req.body.password
};
db.collection("Storage").find({
username: req.body.username
}).toArray(function(err, data) {
if (!err)
  if (data.length != 0) {
    db.collection("Storage").updateOne(name, change_pwd, function(err, data) {
      if (err) throw err;
      callback({
        data: "true"
      });
    });
  }
else {
  callback({
    data: "false"
  });
}
});
});
}
module.exports.update=update;

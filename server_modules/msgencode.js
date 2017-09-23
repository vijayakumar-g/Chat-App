var htmlEncode = require('js-htmlencode').htmlEncode;

var msgencode=function(req, res,callback)
{
var msg=htmlEncode(req.body.message);
callback({"msg":msg});
}
module.exports.msgencode=msgencode;
